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
const user_repository_1 = require("../user/user.repository");
let WalletService = class WalletService extends service_core_1.CoreService {
    constructor(walletRepository, transactionService, paystackService, withdrawalService, userRepository) {
        super(walletRepository);
        this.walletRepository = walletRepository;
        this.transactionService = transactionService;
        this.paystackService = paystackService;
        this.withdrawalService = withdrawalService;
        this.userRepository = userRepository;
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
    computeCharges(amount) {
        if (amount <= 5000)
            return 50;
        if (amount > 5000 && amount <= 50000)
            return 75;
        if (amount > 50000)
            return 100;
    }
    async walletWithdraw(data, user_id) {
        const get_wallet = await this.respository.findOne({ user_id });
        if (!get_wallet)
            throw new common_1.BadRequestException('Wallet does not exist.');
        const charges = this.computeCharges(data.amount);
        const totalAmount = data.amount + charges;
        if (get_wallet.amount < +totalAmount)
            throw new common_1.BadRequestException('Insufficient wallet balance. Wait till you recieve more payments before processing a withdrawal.');
        const create_recipient = await this.paystackService.transferRecipient({
            type: 'nuban',
            name: data.name,
            account_number: data.account_number,
            bank_code: data.bank_code,
            currency: 'NGN',
            user_id,
        });
        console.log(create_recipient.recipient_code, data.amount);
        const create_transfer = await this.paystackService.transfer(create_recipient.recipient_code, data.amount * 100);
        const wallet = await this.updateWallet({
            user_id,
            amount: +totalAmount,
            type: transaction_enum_1.TransactionType.DEBIT,
        });
        const resp = await this.transactionService.generateReference();
        const transaction = await this.transactionService.create(Object.assign({ amount: +data.amount, reciever_id: user_id, in_entity_id: wallet._id, in_entity: transaction_enum_1.TransactionEntity.WALLET, type: transaction_enum_1.TransactionType.DEBIT, reference: resp.reference, status: create_transfer.status == 'success'
                ? transaction_enum_1.TransactionStatus.PAID
                : create_transfer.status }, (create_transfer.status == 'success'
            ? { payment_date: new Date() }
            : {})));
        const widthrawal = await this.withdrawalService.create({
            user_id,
            amount: +data.amount,
            charges: +charges,
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
        const resp2 = await this.transactionService.generateReference();
        await this.transactionService.create(Object.assign(Object.assign({ amount: +charges, reciever_id: user_id, in_entity_id: wallet._id, in_entity: transaction_enum_1.TransactionEntity.WALLET, type: transaction_enum_1.TransactionType.DEBIT, reference: resp2.reference, status: create_transfer.status == 'success'
                ? transaction_enum_1.TransactionStatus.PAID
                : create_transfer.status }, (create_transfer.status == 'success'
            ? { payment_date: new Date() }
            : {})), { out_entity_id: widthrawal._id, out_entity: transaction_enum_1.TransactionEntity.WITHDRAWAL, is_charges: true }));
        return widthrawal;
    }
    async webhook(body) {
        const { event, data } = body;
        switch (event) {
            case 'transfer.success':
                await this.successfulTransferWebhook(data);
                break;
            default:
                break;
        }
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
                const adminWallet = await this.updateWallet({
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
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wallet_repository_1.WalletRepository,
        transaction_service_1.TransactionService,
        paystack_service_1.PaystackService,
        withdrawal_service_1.WithdrawalService,
        user_repository_1.UserRepository])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map