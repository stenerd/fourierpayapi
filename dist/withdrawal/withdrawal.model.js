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
exports.WithdrawalSchema = exports.Withdrawal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_enum_1 = require("../transaction/transaction.enum");
let Withdrawal = class Withdrawal {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Withdrawal.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], Withdrawal.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], Withdrawal.prototype, "charges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Withdrawal.prototype, "account_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Withdrawal.prototype, "bank_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Withdrawal.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Withdrawal.prototype, "bank_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Withdrawal.prototype, "recipient_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Withdrawal.prototype, "transfer_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Withdrawal.prototype, "paystack_reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.Mixed }),
    __metadata("design:type", Object)
], Withdrawal.prototype, "payload", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'Transaction' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Withdrawal.prototype, "transaction_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionStatus,
        default: transaction_enum_1.TransactionStatus.PENDING,
    }),
    __metadata("design:type", String)
], Withdrawal.prototype, "status", void 0);
Withdrawal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Withdrawal);
exports.Withdrawal = Withdrawal;
exports.WithdrawalSchema = mongoose_1.SchemaFactory.createForClass(Withdrawal);
exports.WithdrawalSchema.index({
    bank_name: 1,
    account_number: -1,
    name: 1,
    paystack_reference: -1,
});
//# sourceMappingURL=withdrawal.model.js.map