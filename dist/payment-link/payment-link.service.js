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
const qrcode_service_1 = require("../qrcode/qrcode.service");
const date_formatter_util_1 = require("../utils/date-formatter.util");
const date_fns_1 = require("date-fns");
let PaymentLinkService = class PaymentLinkService extends service_core_1.CoreService {
    constructor(paymentLinkRepository, payerSheetRepository, paymentLinkFactory, linkService, configService, excelService, cloudinaryService, qRCodeService) {
        super(paymentLinkRepository);
        this.paymentLinkRepository = paymentLinkRepository;
        this.payerSheetRepository = payerSheetRepository;
        this.paymentLinkFactory = paymentLinkFactory;
        this.linkService = linkService;
        this.configService = configService;
        this.excelService = excelService;
        this.cloudinaryService = cloudinaryService;
        this.qRCodeService = qRCodeService;
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
        const codeQR = await this.qRCodeService.generateQRCode(paymentLinkAttribute.link);
        paymentLinkAttribute.qr_code = codeQR;
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
    async getAllPaymentLink(query) {
        const resp = await this.paymentLinkRepository.find(query, {}, {});
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
    async dashboardPaymentLink(query) {
        const searchAllQuery = Object.assign(Object.assign(Object.assign({}, (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate).toISOString(),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
                $gte: new Date(query.startDate).toISOString(),
            },
        }));
        const totalAll = await this.paymentLinkRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        return { totalAll };
    }
    async adminPaymentLink(query) {
        let searchQuery = {};
        if (query.q) {
            searchQuery = {
                name: { $regex: query.q, $options: 'i' },
            };
        }
        if (query.status) {
            searchQuery.status = query.status;
        }
        if (query.state) {
            searchQuery.state = query.state;
        }
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate),
                $gte: new Date(query.startDate),
            },
        }));
        const total = await this.paymentLinkRepository
            .model()
            .find(Object.assign({}, searchQuery))
            .count();
        const { page, perPage } = query;
        const paymentLinks = await this.paymentLinkRepository.model().aggregate([
            {
                $match: Object.assign({}, searchQuery),
            },
            {
                $lookup: {
                    from: 'users',
                    let: { creator_id: '$creator_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$creator_id'] } } },
                        { $limit: 1 },
                    ],
                    as: 'users',
                },
            },
            {
                $lookup: {
                    from: 'payments',
                    let: { payment_link_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$payment_link_id', '$$payment_link_id'],
                                },
                            },
                        },
                        {
                            $match: {
                                status: transaction_enum_1.TransactionStatus.PAID,
                            },
                        },
                    ],
                    as: 'payments',
                },
            },
            {
                $addFields: {
                    user_details: '$users',
                    paymentCount: { $size: '$payments' },
                    totlaPayment: { $sum: '$payments.amount' },
                    totalCharges: { $sum: '$payments.charges' },
                },
            },
            {
                $project: {
                    _id: 1,
                    creator_id: 1,
                    user_details: 1,
                    amount: 1,
                    charges: 1,
                    name: 1,
                    role: 1,
                    unique_field: 1,
                    link: 1,
                    expected_number_of_payments: 1,
                    status: 1,
                    activate_public_link: 1,
                    state: 1,
                    paymentCount: 1,
                    totlaPayment: 1,
                    totalCharges: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $skip: ((+page || 1) - 1) * (+perPage || 10),
            },
            {
                $limit: +perPage || 10,
            },
        ]);
        return {
            data: paymentLinks,
            meta: {
                total,
                page: +page || 1,
                lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
            },
        };
    }
    async adminPaymentLinksCount(query) {
        let searchQuery = {};
        if (query.q) {
            searchQuery = {
                name: { $regex: query.q, $options: 'i' },
            };
        }
        if (query.status) {
            searchQuery.status = query.status;
        }
        const searchAllQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate),
                $gte: new Date(query.startDate),
            },
        }));
        const searchPrivateQuery = Object.assign({ state: payment_link_enum_1.PaymentLinkStateEnum.PRIVATE }, searchAllQuery);
        const searchPublicQuery = Object.assign({ state: payment_link_enum_1.PaymentLinkStateEnum.PUBLIC }, searchAllQuery);
        const totalPrivate = await this.paymentLinkRepository
            .model()
            .find(Object.assign({}, searchPrivateQuery))
            .count();
        const totalPublic = await this.paymentLinkRepository
            .model()
            .find(Object.assign({}, searchPublicQuery))
            .count();
        const totalAll = await this.paymentLinkRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        let privatePercentage = 0;
        let allPercentage = 0;
        let publicPercentage = 0;
        const checkLast = query.startDate && query.endDate;
        if (!!checkLast) {
            const getDifferenceInDays = (0, date_formatter_util_1.CheckDateDifference)(query.startDate, query.endDate);
            const lastSearchQueries = Object.assign(Object.assign({}, searchQuery), (query.startDate &&
                query.endDate && {
                createdAt: {
                    $gte: new Date((0, date_fns_1.format)((0, date_fns_1.subDays)((0, date_fns_1.parseISO)(query.startDate), getDifferenceInDays), 'yyyy-MM-dd')).toISOString(),
                    $lte: new Date(query.startDate).toISOString(),
                },
            }));
            const lastSearchPrivateQuery = Object.assign(Object.assign({}, lastSearchQueries), { state: payment_link_enum_1.PaymentLinkStateEnum.PRIVATE });
            const lastSearchPublicQuery = Object.assign(Object.assign({}, lastSearchQueries), { state: payment_link_enum_1.PaymentLinkStateEnum.PUBLIC });
            const lastTotalPrivate = await this.paymentLinkRepository
                .model()
                .find(Object.assign({}, lastSearchPrivateQuery))
                .count();
            const lastTotalPublic = await this.paymentLinkRepository
                .model()
                .find(Object.assign({}, lastSearchPublicQuery))
                .count();
            const lastTotalAll = await this.paymentLinkRepository
                .model()
                .find(Object.assign({}, lastSearchQueries))
                .count();
            allPercentage = ((totalAll - lastTotalAll) / (lastTotalAll || 1)) * 100;
            publicPercentage =
                ((totalPublic - lastTotalPublic) / (lastTotalPublic || 1)) * 100;
            privatePercentage =
                ((totalPrivate - lastTotalPrivate) / (lastTotalPrivate || 1)) * 100;
        }
        return {
            data: {
                all: totalAll,
                private: totalPrivate,
                public: totalPublic,
                allPercentage,
                publicPercentage,
                privatePercentage,
                showPercent: !!checkLast,
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
        cloudinary_service_1.CloudinaryService,
        qrcode_service_1.QRCodeService])
], PaymentLinkService);
exports.PaymentLinkService = PaymentLinkService;
//# sourceMappingURL=payment-link.service.js.map