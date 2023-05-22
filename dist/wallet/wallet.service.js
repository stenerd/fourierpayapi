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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const paystack_service_1 = require("../paystack/paystack.service");
const transaction_enum_1 = require("../transaction/transaction.enum");
const transaction_service_1 = require("../transaction/transaction.service");
const withdrawal_service_1 = require("../withdrawal/withdrawal.service");
const wallet_repository_1 = require("./wallet.repository");
let WalletService = class WalletService extends service_core_1.CoreService {
    constructor(walletRepository, transactionService, paystackService, withdrawalService) {
        super(walletRepository);
        this.walletRepository = walletRepository;
        this.transactionService = transactionService;
        this.paystackService = paystackService;
        this.withdrawalService = withdrawalService;
    }
    async updateWallet(data) {
        const wallet = await this.findOne({ user_id: data.user_id });
        if (!wallet)
            throw new common_1.BadRequestException('Wallet does not exist.');
        await this.updateOne(wallet._id, {
            amount: data.type == transaction_enum_1.TransactionType.CREDIT
                ? wallet.amount + data.amount
                : wallet.amount - data.amount,
        });
        return wallet;
    }
    async getWallet(user_id = null) {
        const resp = await this.walletRepository.findOne(Object.assign({}, (user_id && { user_id })), {}, {
            populate: [{ path: 'user_id' }],
        });
        return resp;
    }
    async walletWithdraw(data, user_id) {
        const create_recipient = await this.paystackService.transferRecipient({
            type: 'nuban',
            name: data.name,
            account_number: data.account_number,
            bank_code: data.bank_code,
            currency: 'NGN',
            user_id,
        });
        console.log('create_recipient >> ', create_recipient);
        console.log(create_recipient.recipient_code, data.amount);
        const create_transfer = await this.paystackService.transfer(create_recipient.recipient_code, data.amount * 100);
        console.log('create_transfer >> ', create_transfer);
        const wallet = await this.updateWallet({
            user_id,
            amount: data.amount,
            type: transaction_enum_1.TransactionType.DEBIT,
        });
        const resp = await this.transactionService.generateReference();
        const transaction = await this.transactionService.create(Object.assign({ amount: data.amount, reciever_id: user_id, in_entity_id: wallet._id, in_entity: transaction_enum_1.TransactionEntity.WALLET, type: transaction_enum_1.TransactionType.DEBIT, reference: resp.reference, status: create_transfer.status == 'success'
                ? transaction_enum_1.TransactionStatus.PAID
                : create_transfer.status }, (create_transfer.status == 'success'
            ? { payment_date: new Date() }
            : {})));
        const widthrawal = await this.withdrawalService.create({
            user_id,
            amount: data.amount,
            account_number: data.account_number,
            bank_name: data.bank_name,
            name: data.name,
            bank_code: data.bank_code,
            recipient_code: create_recipient.recipient_code,
            transfer_code: create_transfer.transfer_code,
            paystack_reference: create_transfer.reference,
            transaction_id: transaction._id,
            payload: {
                recipient: create_recipient,
                transfer: create_transfer,
            },
            status: create_transfer.status == 'success'
                ? transaction_enum_1.TransactionStatus.PAID
                : create_transfer.status,
        });
        await this.transactionService.updateOne(transaction._id, {
            out_entity_id: widthrawal._id,
            out_entity: transaction_enum_1.TransactionEntity.WITHDRAWAL,
        });
        return widthrawal;
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wallet_repository_1.WalletRepository,
        transaction_service_1.TransactionService,
        paystack_service_1.PaystackService,
        withdrawal_service_1.WithdrawalService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map