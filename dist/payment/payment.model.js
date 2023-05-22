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
exports.PaymentSchema = exports.Payment = exports.FormSchema = exports.Form = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_link_enum_1 = require("../payment-link/payment-link.enum");
const transaction_enum_1 = require("../transaction/transaction.enum");
let Form = class Form extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Form.prototype, "field_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: payment_link_enum_1.FieldTypeEnum }),
    __metadata("design:type", String)
], Form.prototype, "field_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Form.prototype, "required", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Form.prototype, "options", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Form.prototype, "answer", void 0);
Form = __decorate([
    (0, mongoose_1.Schema)()
], Form);
exports.Form = Form;
exports.FormSchema = mongoose_1.SchemaFactory.createForClass(Form);
let Payment = class Payment {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], Payment.prototype, "charges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "unique_field", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "unique_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "priority_1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "priority_1_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "priority_2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "priority_2_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "priority_3", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Payment.prototype, "priority_3_answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User', required: false }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Payment.prototype, "payer_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'Transaction' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Payment.prototype, "transaction_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'PaymentLink' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Payment.prototype, "payment_link_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Payment.prototype, "reciever_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FormSchema], default: [] }),
    __metadata("design:type", Array)
], Payment.prototype, "form", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: transaction_enum_1.TransactionStatus,
        default: transaction_enum_1.TransactionStatus.PENDING,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
Payment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Payment);
exports.Payment = Payment;
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
exports.PaymentSchema.index({
    unique_answer: -1,
    priority_1_answer: -1,
    priority_2_answer: -1,
    priority_3_answer: -1,
});
//# sourceMappingURL=payment.model.js.map