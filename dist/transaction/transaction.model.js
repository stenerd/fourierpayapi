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
exports.TransactionSchema = exports.Transaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_enum_1 = require("./transaction.enum");
let Transaction = class Transaction {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transaction.prototype, "payer_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transaction.prototype, "reciever_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'PaymentLink' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transaction.prototype, "payment_link_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, refPath: 'in_entity' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transaction.prototype, "in_entity_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionEntity,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "in_entity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, refPath: 'out_entity' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Transaction.prototype, "out_entity_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionEntity,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "out_entity", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionType,
        default: transaction_enum_1.TransactionType.DEBIT,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Transaction.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionStatus,
        default: transaction_enum_1.TransactionStatus.PENDING,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Transaction.prototype, "is_charges", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Transaction.prototype, "payment_date", void 0);
Transaction = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Transaction);
exports.Transaction = Transaction;
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);
exports.TransactionSchema.index({
    reference: -1,
});
//# sourceMappingURL=transaction.model.js.map