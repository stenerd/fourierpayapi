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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const service_core_1 = require("../common/core/service.core");
const payment_link_enum_1 = require("../payment-link/payment-link.enum");
const payment_link_service_1 = require("../payment-link/payment-link.service");
const paystack_factory_1 = require("../paystack/paystack.factory");
const paystack_service_1 = require("../paystack/paystack.service");
const transaction_enum_1 = require("../transaction/transaction.enum");
const transaction_service_1 = require("../transaction/transaction.service");
const user_service_1 = require("../user/user.service");
const wallet_service_1 = require("../wallet/wallet.service");
const payment_repository_1 = require("./payment.repository");
let PaymentService = class PaymentService extends service_core_1.CoreService {
    constructor(paymentRepository, paystackService, paystackFactory, paymentLinkService, transactionService, walletService, configService, userService) {
        super(paymentRepository);
        this.paymentRepository = paymentRepository;
        this.paystackService = paystackService;
        this.paystackFactory = paystackFactory;
        this.paymentLinkService = paymentLinkService;
        this.transactionService = transactionService;
        this.walletService = walletService;
        this.configService = configService;
        this.userService = userService;
    }
    async newPayment(data) {
        const payment = await this.paymentRepository.create(Object.assign({}, data));
        return payment;
    }
    async initializePayment(dto) {
        const get_reference = await this.transactionService.generateReference();
        const payment_link = await this.paymentLinkService.findOne({
            _id: dto.payment_link_id,
        }, {}, {
            populate: [{ path: 'creator_id' }],
        });
        if (!payment_link)
            throw new common_1.BadRequestException('payment link does not exist');
        let unique_answer = '';
        let priority_1_answer = '';
        let priority_2_answer = '';
        let priority_3_answer = '';
        for (let i = 0; i < dto.form.length; i++) {
            const eachForm = dto.form[i];
            if (eachForm.field_name.trim() == payment_link.unique_field) {
                unique_answer = eachForm.answer;
            }
            if (eachForm.field_name.trim() == payment_link.priority_1) {
                priority_1_answer = eachForm.answer;
            }
            if (eachForm.field_name.trim() == payment_link.priority_2) {
                priority_2_answer = eachForm.answer;
            }
            if (eachForm.field_name.trim() == payment_link.priority_3) {
                priority_3_answer = eachForm.answer;
            }
        }
        if (payment_link.status !== payment_link_enum_1.PaymentLinkStatusEnum.ACTIVE)
            throw new common_1.BadRequestException('Payment link is not active.');
        if (payment_link.state == payment_link_enum_1.PaymentLinkStateEnum.PRIVATE) {
            const get_payer_data = await this.paymentLinkService.getPayerData(dto.payment_link_id, unique_answer);
            if (!get_payer_data)
                throw new common_1.BadRequestException('You are not eligible to make this payment.');
            if (get_payer_data.status == transaction_enum_1.TransactionStatus.PAID)
                throw new common_1.BadRequestException('You have already made your payment.');
        }
        const payment = await this.newPayment({
            payment_link_id: payment_link._id,
            amount: payment_link.amount,
            charges: payment_link.charges,
            form: dto.form,
            unique_field: payment_link.unique_field,
            unique_answer: unique_answer || '',
            priority_1: payment_link.priority_1,
            priority_1_answer: priority_1_answer || '',
            priority_2: payment_link.priority_2,
            priority_2_answer: priority_2_answer || '',
            priority_3: payment_link.priority_3,
            priority_3_answer: priority_3_answer || '',
            reciever_id: payment_link.creator_id._id,
        });
        const generate_paystack_payload = this.paystackFactory.initilizePaymentPayload(dto, get_reference.reference, payment_link, payment, transaction_enum_1.TransactionEntity.PAYMENT);
        const trnx_payload = {
            amount: payment_link.amount,
            reciever_id: payment_link.creator_id,
            payment_link_id: payment_link._id,
            in_entity_id: payment._id,
            in_entity: transaction_enum_1.TransactionEntity.PAYMENT,
            reference: get_reference.reference,
            type: transaction_enum_1.TransactionType.CREDIT,
        };
        const trnx = await this.transactionService.create(Object.assign({}, trnx_payload));
        await this.updateOne(payment._id, { transaction_id: trnx._id });
        return Object.assign(Object.assign({}, generate_paystack_payload), { publicKey: this.configService.get('PAYSTACK_PUBLIC') });
    }
    async verifyPayment(dto) {
        const result = await this.paystackService.verifyPayment(dto.reference);
        const { metadata, amount, } = result;
        console.log('amount >> ', amount, dto.reference);
        const transaction = await this.transactionService.findOne({
            reference: dto.reference,
        });
        if (!transaction)
            throw new common_1.BadRequestException('Transaction does not exist');
        if (transaction.status === transaction_enum_1.TransactionStatus.PAID) {
            console.log('transaction.status === TransactionStatus.PAID >> ', transaction);
            const pay = await this.findOne({
                _id: transaction.in_entity_id,
            });
            return {
                payment: pay,
                transaction,
            };
        }
        if (result.status == 'success') {
            const session = await this.paymentRepository.model().startSession();
            session.startTransaction();
            let transacionData = null;
            let payment = null;
            try {
                const resp = await this.walletService.getRepository().findOneAndUpdate({ user_id: transaction.reciever_id }, {
                    $inc: { amount: transaction.amount },
                }, { session });
                transacionData = await this.transactionService
                    .getRepository()
                    .findOneAndUpdate({ _id: transaction._id }, {
                    status: transaction_enum_1.TransactionStatus.PAID,
                    out_entity_id: resp._id,
                    out_entity: transaction_enum_1.TransactionEntity.WALLET,
                }, { session });
                payment = await this.getRepository().findOneAndUpdate({ _id: transaction.in_entity_id }, {
                    status: transaction_enum_1.TransactionStatus.PAID,
                }, { session });
                const payment_link = await this.paymentLinkService
                    .getRepository()
                    .findOneAndUpdate({ _id: transaction.payment_link_id }, {
                    recieved_payment: true,
                }, { session });
                if (payment_link.state == payment_link_enum_1.PaymentLinkStateEnum.PRIVATE) {
                    await this.paymentLinkService.getRepository().findOneAndUpdate({
                        payment_link_id: transaction.payment_link_id,
                        unique_answer: payment.unique_answer,
                    }, {
                        payment_id: payment._id,
                        status: transaction_enum_1.TransactionStatus.PAID,
                        payment_date: payment.createdAt,
                    }, { session });
                }
                if (amount / 100 > transaction.amount) {
                    const get_reference = await this.transactionService.generateReference();
                    const superAdmin = await this.userService.findOne({
                        email: this.configService.get('ADMIN_EMAIL'),
                    });
                    const adminWallet = await this.walletService
                        .getRepository()
                        .findOneAndUpdate({
                        user_id: superAdmin._id,
                    }, {
                        $inc: { amount: amount / 100 - transaction.amount },
                    }, { session });
                    const trnx_payload = {
                        amount: amount / 100 - transaction.amount,
                        reciever_id: superAdmin._id,
                        payment_link_id: transaction.payment_link_id,
                        in_entity_id: transaction.in_entity_id,
                        in_entity: transaction_enum_1.TransactionEntity.PAYMENT,
                        reference: get_reference.reference,
                        type: transaction_enum_1.TransactionType.CREDIT,
                        status: transaction_enum_1.TransactionStatus.PAID,
                        out_entity_id: adminWallet._id,
                        out_entity: transaction_enum_1.TransactionEntity.WALLET,
                        is_charges: true,
                    };
                    await this.transactionService
                        .getRepository()
                        .saveData(Object.assign({}, trnx_payload), { session });
                }
                const tranx = await this.transactionService.findOne({
                    reference: dto.reference,
                });
                if (tranx.status === transaction_enum_1.TransactionStatus.PAID) {
                    session.endSession();
                    return {
                        payment,
                        transaction: transacionData,
                    };
                }
                await session.commitTransaction();
            }
            catch (error) {
                await session.abortTransaction();
                throw new common_1.BadRequestException('Something went wrong!');
            }
            finally {
                session.endSession();
                if (!payment && !transacionData) {
                    const pay = await this.findOne({
                        _id: transaction.in_entity_id,
                    });
                    return {
                        payment: pay,
                        transaction,
                    };
                }
                return {
                    payment,
                    transaction: transacionData,
                };
            }
        }
        else {
            const trans = await this.transactionService.updateOne(transaction._id, {
                status: transaction_enum_1.TransactionStatus.ABANDONED,
            });
            const pay = await this.updateOne(transaction.in_entity_id, {
                status: transaction_enum_1.TransactionStatus.ABANDONED,
            });
            return {
                transaction: trans,
                payment: pay,
            };
        }
    }
    async abandonPayment(dto) {
        const transaction = await this.transactionService.findOne({
            reference: dto.reference,
        });
        if (!transaction)
            throw new common_1.BadRequestException('Transaction does not exist');
        await this.transactionService.updateOne(transaction._id, {
            status: transaction_enum_1.TransactionStatus.ABANDONED,
        });
        await this.updateOne(transaction.in_entity_id, {
            status: transaction_enum_1.TransactionStatus.ABANDONED,
        });
        return {
            transaction,
        };
    }
    async getPaymentByCode(code, query) {
        const paymentLink = await this.paymentLinkService.findOne({
            code,
        });
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
        const total = await this.paymentRepository
            .model()
            .find(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id }))
            .count();
        const { page, perPage } = query;
        const payments = await this.paymentRepository
            .model()
            .find(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id }))
            .populate(['transaction_id'])
            .sort({ _id: -1 })
            .skip(((+page || 1) - 1) * (+perPage || 10))
            .limit(+perPage || 10);
        let recievedAmount = 0;
        let numberOfRecipient = 0;
        for (let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            if (payment.status === transaction_enum_1.TransactionStatus.PAID) {
                recievedAmount += +payment.amount;
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
    async getExternalPayment(code, query) {
        const paymentLink = await this.paymentLinkService.findOne({
            code,
        }, {}, {
            populate: ['creator_id'],
        });
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
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
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
        if (paymentLink.state === payment_link_enum_1.PaymentLinkStateEnum.PRIVATE) {
            return this.paymentLinkService.getExternalPaymentData(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id }), paymentLink);
        }
        else {
            const total = await this.paymentRepository
                .model()
                .find(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id, status: transaction_enum_1.TransactionStatus.PAID }))
                .count();
            const { page, perPage } = query;
            const payments = await this.paymentRepository
                .model()
                .find(Object.assign(Object.assign({}, searchQuery), { payment_link_id: paymentLink._id, status: transaction_enum_1.TransactionStatus.PAID }))
                .populate(['transaction_id'])
                .sort({ _id: -1 })
                .skip(((+page || 1) - 1) * (+perPage || 10))
                .limit(+perPage || 10);
            let recievedAmount = 0;
            let numberOfRecipient = 0;
            for (let i = 0; i < payments.length; i++) {
                const payment = payments[i];
                if (payment.status === transaction_enum_1.TransactionStatus.PAID) {
                    recievedAmount += +payment.amount;
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
    }
    async getPaymentReference(reference) {
        const transaction = await this.transactionService.findOne({
            reference,
        }, {}, {
            populate: ['in_entity_id'],
        });
        if (!transaction)
            throw new common_1.BadRequestException('reference does not exist');
        if (transaction.in_entity !== transaction_enum_1.TransactionEntity.PAYMENT)
            throw new common_1.BadRequestException('reference is not valid');
        return transaction;
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_repository_1.PaymentRepository,
        paystack_service_1.PaystackService,
        paystack_factory_1.PaystackFactory,
        payment_link_service_1.PaymentLinkService,
        transaction_service_1.TransactionService,
        wallet_service_1.WalletService,
        config_1.ConfigService,
        user_service_1.UserService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map