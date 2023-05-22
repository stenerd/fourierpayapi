"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinkService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const service_core_1 = require("../common/core/service.core");
const excel_processor_service_1 = require("../file-processor/excel-processor.service");
const link_enum_1 = require("../link/link.enum");
const link_service_1 = require("../link/link.service");
const code_generator_util_1 = require("../utils/code-generator.util");
const payment_link_enum_1 = require("./payment-link.enum");
const payment_link_factory_1 = require("./payment-link.factory");
const payment_link_repository_1 = require("./repositories/payment-link.repository");
const payer_sheet_repository_1 = require("./repositories/payer_sheet.repository");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const transaction_enum_1 = require("../transaction/transaction.enum");
let PaymentLinkService = class PaymentLinkService extends service_core_1.CoreService {
    constructor(paymentLinkRepository, payerSheetRepository, paymentLinkFactory, linkService, configService, excelService, cloudinaryService) {
        super(paymentLinkRepository);
        this.paymentLinkRepository = paymentLinkRepository;
        this.payerSheetRepository = payerSheetRepository;
        this.paymentLinkFactory = paymentLinkFactory;
        this.linkService = linkService;
        this.configService = configService;
        this.excelService = excelService;
        this.cloudinaryService = cloudinaryService;
    }
    async generateCode() {
        const unique_code = (0, code_generator_util_1.GenerateRandomString)(30);
        if (await this.findOne({ code: unique_code })) {
            return await this.generateCode();
        }
        else {
            return unique_code;
        }
    }
    async createPaymentLink(dto, user_id) {
        const get_link = await this.linkService.findOne({
            user_id,
            usage: link_enum_1.LinkUsageEnum.AVAILABLE,
        });
        if (!get_link)
            throw new common_1.BadRequestException('You dont have an available payment link.');
        const code = await this.generateCode();
        const paymentLinkAttribute = this.paymentLinkFactory.createNew(dto, code, user_id, get_link._id, this.configService.get('FRONTEND_BASEURL'));
        await this.paymentLinkRepository.create(paymentLinkAttribute);
        await this.linkService.updateOne(get_link._id, {
            usage: link_enum_1.LinkUsageEnum.USED,
        });
    }
    async changePaymentLinkStatus(dto, code, user_id) {
        const get_payment_link = await this.paymentLinkRepository.findOne({
            creator_id: user_id,
            code: code,
        });
        if (!get_payment_link)
            throw new common_1.BadRequestException('This payment link does not exist.');
        await this.updateOne(get_payment_link._id, {
            status: dto.status,
        });
    }
    async changePaymentLinkToPublicState(code, user_id) {
        const get_payment_link = await this.paymentLinkRepository.findOne({
            creator_id: user_id,
            code: code,
        });
        if (!get_payment_link)
            throw new common_1.BadRequestException('This payment link does not exist.');
        return await this.updateOne(get_payment_link._id, {
            state: payment_link_enum_1.PaymentLinkStateEnum.PUBLIC,
        });
    }
    async activatePublicLink(code, user_id) {
        const get_payment_link = await this.paymentLinkRepository.findOne({
            creator_id: user_id,
            code: code,
        });
        if (!get_payment_link)
            throw new common_1.BadRequestException('This payment link does not exist.');
        return await this.updateOne(get_payment_link._id, {
            activate_public_link: !get_payment_link.activate_public_link,
        });
    }
    async changePaymentLinkToPrivateState(file, code, user_id, buffer) {
        const get_payment_link = await this.paymentLinkRepository.findOne({
            creator_id: user_id,
            code: code,
        });
        if (!get_payment_link)
            throw new common_1.BadRequestException('This payment link does not exist.');
        if (get_payment_link.recieved_payment)
            throw new common_1.BadRequestException(`You can't move to private after recieving payment with this link.`);
        const data = await this.excelService.extractJsonFromExcel(buffer);
        if (!data.length)
            throw new common_1.BadRequestException(`You can't upload an empty sheet.`);
        const payload = this.paymentLinkFactory.createPayerSheet(user_id, get_payment_link._id, data);
        if (!payload.length)
            throw new common_1.BadRequestException(`There is no valid item in the sheet you uploaded. Please note that Unique Field is a required field.`);
        let payerCount = 0;
        for (let i = 0; i < payload.length; i++) {
            const eachPayload = payload[i];
            const uploadedSheet = await this.payerSheetRepository.findOne({
                payment_link_id: get_payment_link._id,
                unique_answer: eachPayload.unique_answer,
            });
            if (!uploadedSheet) {
                payerCount += 1;
                await this.payerSheetRepository.create(eachPayload);
            }
        }
        let documentData = {};
        if (payerCount) {
            const folderName = 'payer_sheets';
            const uploadData = await this.cloudinaryService.uploadFile(file, folderName);
            console.log('uploadData >> ', uploadData);
            documentData = {
                publicId: uploadData.public_id || '',
                secureUrl: uploadData.secure_url || '',
            };
        }
        return await this.updateOne(get_payment_link._id, Object.assign(Object.assign(Object.assign({ state: payment_link_enum_1.PaymentLinkStateEnum.PRIVATE }, (!get_payment_link.sheet_uploaded && {
            expected_number_of_payments: get_payment_link.sheet_uploaded
                ? get_payment_link.expected_number_of_payments + payerCount
                : payerCount,
        })), { sheet_uploaded: true }), (payerCount && {
            $push: {
                sheetUrl: documentData,
            },
        })));
    }
    async getPayerData(payment_link_id, unique_answer) {
        const resp = await this.payerSheetRepository.findOne({
            payment_link_id,
            unique_answer,
        });
        return resp;
    }
    async updatePayerInfo(query, data) {
        const resp = await this.payerSheetRepository.findOneAndUpdate(query, data, {});
        return resp;
    }
    async getPaymentLink(user_id = null) {
        const resp = await this.paymentLinkRepository.find(Object.assign({}, (user_id && { creator_id: user_id })), {}, {
            sort: { createdAt: -1 },
            populate: [{ path: 'creator_id' }],
        });
        return resp;
    }
    async singlePaymentLink(code) {
        const resp = await this.paymentLinkRepository.findOne({ code }, {}, {
            populate: [{ path: 'creator_id' }],
        });
        return resp;
    }
    async getPayerSheet(code, query, user_id) {
        const paymentLink = await this.findOne(Object.assign({ code }, (user_id ? { creator_id: user_id } : {})));
        if (!paymentLink)
            throw new common_1.BadRequestException('payment link does not exist');
        let searchQuery = {};
        if (query.q) {
            searchQuery = {
                $or: [
                    { unique_answer: { $regex: query.q, $options: 'i' } },
                    { priority_1_answer: { $regex: query.q, $options: 'i' } },
                    { priority_2_answer: { $regex: query.q, $options: 'i' } },
                    { priority_3_answer: { $regex: query.q, $options: 'i' } },
                ],
            };
        }
        if (query.priority_1_answer) {
            searchQuery.priority_1_answer = query.priority_1_answer;
        }
        if (query.priority_2_answer) {
            searchQuery.priority_2_answer = query.priority_2_answer;
        }
        if (query.priority_3_answer) {
            searchQuery.priority_3_answer = query.priority_3_answer;
        }
        if (query.status) {
            searchQuery.status = query.status;
        }
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
            !query.endDate && {
            payment_date: {
                $gte: new Date(query.startDate).toISOString(),
            },
        })), (!query.startDate &&
            query.endDate && {
            payment_date: {
                $lte: new Date(query.endDate).toISOString(),
            },
        })), (query.startDate &&
            query.endDate && {
            payment_date: {
                $lte: new Date(query.endDate).toISOString(),
                $gte: new Date(query.startDate).toISOString(),
            },
        }));
        const total = await this.payerSheetRepository
            .model()
            .find(Object.assign(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id }), (user_id ? { creator_id: user_id } : {})))
            .count();
        const { page, perPage } = query;
        const payerSheets = await this.payerSheetRepository
            .model()
            .find(Object.assign(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id }), (user_id ? { creator_id: user_id } : {})))
            .populate(['payment_id'])
            .sort({ _id: -1 })
            .skip(((+page || 1) - 1) * (+perPage || 10))
            .limit(+perPage || 10);
        return {
            data: payerSheets,
            meta: {
                total,
                page: +page || 1,
                lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
            },
        };
    }
    async getExternalPaymentData(query, paymentLink) {
        const total = await this.payerSheetRepository.model().find(query).count();
        const { page, perPage } = query;
        const payments = await this.payerSheetRepository
            .model()
            .find(query)
            .populate(['payment_id'])
            .sort({ _id: -1 })
            .skip(((+page || 1) - 1) * (+perPage || 10))
            .limit(+perPage || 10);
        let recievedAmount = 0;
        let numberOfRecipient = 0;
        for (let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            if (payment.status === transaction_enum_1.TransactionStatus.PAID) {
                recievedAmount += +paymentLink.amount;
                numberOfRecipient++;
            }
        }
        return {
            data: {
                payments,
                paymentLink,
                recievedAmount,
                numberOfRecipient,
            },
            meta: {
                total,
                page: +page || 1,
                lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
            },
        };
    }
};
PaymentLinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_link_repository_1.PaymentLinkRepository,
        payer_sheet_repository_1.PayerSheetRepository,
        payment_link_factory_1.PaymentLinkFactory,
        link_service_1.LinkService,
        config_1.ConfigService,
        excel_processor_service_1.ExcelService,
        cloudinary_service_1.CloudinaryService])
], PaymentLinkService);
exports.PaymentLinkService = PaymentLinkService;
//# sourceMappingURL=payment-link.service.js.map