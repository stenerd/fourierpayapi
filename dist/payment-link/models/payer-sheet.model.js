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
exports.PayerSheetSchema = exports.PayerSheet = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_enum_1 = require("../../transaction/transaction.enum");
let PayerSheet = class PayerSheet {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PayerSheet.prototype, "unique_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PayerSheet.prototype, "priority_1_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PayerSheet.prototype, "priority_2_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PayerSheet.prototype, "priority_3_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'PaymentLink' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayerSheet.prototype, "payment_link_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayerSheet.prototype, "creator_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: 'Payment',
        default: null,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PayerSheet.prototype, "payment_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Date)
], PayerSheet.prototype, "payment_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionStatus,
        default: transaction_enum_1.TransactionStatus.PENDING,
    }),
    __metadata("design:type", String)
], PayerSheet.prototype, "status", void 0);
PayerSheet = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PayerSheet);
exports.PayerSheet = PayerSheet;
exports.PayerSheetSchema = mongoose_1.SchemaFactory.createForClass(PayerSheet);
exports.PayerSheetSchema.index({
    unique_answer: -1,
    priority_1_answer: -1,
    priority_2_answer: -1,
    priority_3_answer: -1,
});
//# sourceMappingURL=payer-sheet.model.js.map