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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const paystack_service_1 = require("../paystack/paystack.service");
const transaction_enum_1 = require("../transaction/transaction.enum");
const transaction_service_1 = require("../transaction/transaction.service");
const withdrawal_service_1 = require("../withdrawal/withdrawal.service");
const user_repository_1 = require("../user/user.repository");
const payment_link_service_1 = require("../payment-link/payment-link.service");
const wallet_service_1 = require("../wallet/wallet.service");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const payment_service_1 = require("../payment/payment.service");
let WebhookService = class WebhookService {
    constructor(transactionService, paystackService, withdrawalService, userRepository, paymentLinkService, walletService, configService, userService, paymentService) {
        this.transactionService = transactionService;
        this.paystackService = paystackService;
        this.withdrawalService = withdrawalService;
        this.userRepository = userRepository;
        this.paymentLinkService = paymentLinkService;
        this.walletService = walletService;
        this.configService = configService;
        this.userService = userService;
        this.paymentService = paymentService;
    }
    async webhook(body) {
        const { event, data } = body;
        switch (event) {
            case 'transfer.success':
                await this.successfulTransferWebhook(data);
                break;
            case 'charge.success':
                await this.successfulPaymentWebhook(data);
                break;
            default:
                break;
        }
    }
    async successfulPaymentWebhook(data) {
        const { reference } = data;
        console.log('successfulPaymentWebhook >> ');
        await this.paymentService.verifyPayment({ reference });
    }
    async successfulTransferWebhook(data) {
        const { reference, status } = data;
        const withdrawal = await this.withdrawalService.findOne({
            paystack_reference: reference,
        });
        if (withdrawal) {
            await this.withdrawalService.updateOne(withdrawal._id, {
                status: status == 'success' ? transaction_enum_1.TransactionStatus.PAID : status,
                payload: Object.assign(Object.assign({}, withdrawal.payload), { webhook: data }),
            });
            const transaction = await this.transactionService.findOne({
                _id: withdrawal.transaction_id,
            });
            if (transaction) {
                await this.transactionService.updateOne(transaction._id, {
                    status: status == 'success' ? transaction_enum_1.TransactionStatus.PAID : status,
                    payment_date: new Date(),
                });
            }
            const transaction_charges = await this.transactionService.findOne({
                out_entity_id: withdrawal._id,
                out_entity: transaction_enum_1.TransactionEntity.WITHDRAWAL,
                is_charges: true,
                reciever_id: transaction.reciever_id,
            });
            if (transaction_charges) {
                await this.transactionService.updateOne(transaction_charges._id, {
                    status: status == 'success' ? transaction_enum_1.TransactionStatus.PAID : status,
                    payment_date: new Date(),
                });
            }
            if (withdrawal.charges) {
                const get_reference = await this.transactionService.generateReference();
                const superAdmin = await this.userRepository.findOne({
                    email: 'fourierpay@gmail.com',
                });
                const adminWallet = await this.walletService.updateWallet({
                    user_id: superAdmin._id,
                    amount: withdrawal.charges,
                    type: transaction_enum_1.TransactionType.CREDIT,
                });
                const trnx_payload = {
                    amount: withdrawal.charges,
                    reciever_id: superAdmin._id,
                    in_entity_id: withdrawal._id,
                    in_entity: transaction_enum_1.TransactionEntity.WITHDRAWAL,
                    reference: get_reference.reference,
                    type: transaction_enum_1.TransactionType.CREDIT,
                    status: transaction_enum_1.TransactionStatus.PAID,
                    out_entity_id: adminWallet._id,
                    out_entity: transaction_enum_1.TransactionEntity.WALLET,
                    is_charges: true,
                };
                await this.transactionService.create(Object.assign({}, trnx_payload));
            }
        }
    }
};
WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        paystack_service_1.PaystackService,
        withdrawal_service_1.WithdrawalService,
        user_repository_1.UserRepository,
        payment_link_service_1.PaymentLinkService,
        wallet_service_1.WalletService,
        config_1.ConfigService,
        user_service_1.UserService,
        payment_service_1.PaymentService])
], WebhookService);
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map