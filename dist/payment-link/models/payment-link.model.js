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
exports.PaymentLinkSchema = exports.PaymentLink = exports.SheetUrl = exports.FormSchema = exports.Form = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_link_enum_1 = require("../payment-link.enum");
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
Form = __decorate([
    (0, mongoose_1.Schema)()
], Form);
exports.Form = Form;
exports.FormSchema = mongoose_1.SchemaFactory.createForClass(Form);
let SheetUrl = class SheetUrl {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], SheetUrl.prototype, "publicId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], SheetUrl.prototype, "secureUrl", void 0);
SheetUrl = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SheetUrl);
exports.SheetUrl = SheetUrl;
let PaymentLink = class PaymentLink {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'Link' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentLink.prototype, "link_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], PaymentLink.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], PaymentLink.prototype, "charges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentLink.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentLink.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentLink.prototype, "unique_field", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PaymentLink.prototype, "priority_1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PaymentLink.prototype, "priority_2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], PaymentLink.prototype, "priority_3", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PaymentLink.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PaymentLink.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentLink.prototype, "qr_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], PaymentLink.prototype, "expected_number_of_payments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PaymentLink.prototype, "recieved_payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, required: false }),
    __metadata("design:type", Boolean)
], PaymentLink.prototype, "sheet_uploaded", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: payment_link_enum_1.PaymentLinkStatusEnum,
        default: payment_link_enum_1.PaymentLinkStatusEnum.INACTIVE,
    }),
    __metadata("design:type", String)
], PaymentLink.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: payment_link_enum_1.PaymentLinkStateEnum,
        default: payment_link_enum_1.PaymentLinkStateEnum.PUBLIC,
    }),
    __metadata("design:type", String)
], PaymentLink.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentLink.prototype, "creator_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], PaymentLink.prototype, "expires_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PaymentLink.prototype, "activate_public_link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.Array }),
    __metadata("design:type", Array)
], PaymentLink.prototype, "sheetUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FormSchema], default: [] }),
    __metadata("design:type", Array)
], PaymentLink.prototype, "form", void 0);
PaymentLink = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PaymentLink);
exports.PaymentLink = PaymentLink;
exports.PaymentLinkSchema = mongoose_1.SchemaFactory.createForClass(PaymentLink);
//# sourceMappingURL=payment-link.model.js.map