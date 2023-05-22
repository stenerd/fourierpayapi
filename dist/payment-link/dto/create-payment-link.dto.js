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
exports.ChangePaymentLinkStateDto = exports.ChangePaymentLinkStatusDto = exports.CreatePaymentLinkDto = exports.FormDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const payment_link_enum_1 = require("../payment-link.enum");
class FormDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Field Name is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], FormDto.prototype, "field_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Fieeld Type is required',
    }),
    (0, class_validator_1.IsEnum)(payment_link_enum_1.FieldTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FormDto.prototype, "field_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FormDto.prototype, "required", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], FormDto.prototype, "options", void 0);
exports.FormDto = FormDto;
class CreatePaymentLinkDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Name is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Description is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Unique field is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "unique_field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "priority_1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "priority_2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreatePaymentLinkDto.prototype, "priority_3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Amount is required',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePaymentLinkDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentLinkDto.prototype, "expected_number_of_payments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreatePaymentLinkDto.prototype, "expires_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({
        each: true,
    }),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_transformer_1.Type)(() => FormDto),
    __metadata("design:type", Array)
], CreatePaymentLinkDto.prototype, "form", void 0);
exports.CreatePaymentLinkDto = CreatePaymentLinkDto;
class ChangePaymentLinkStatusDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(payment_link_enum_1.PaymentLinkStatusEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePaymentLinkStatusDto.prototype, "status", void 0);
exports.ChangePaymentLinkStatusDto = ChangePaymentLinkStatusDto;
class ChangePaymentLinkStateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(payment_link_enum_1.PaymentLinkStateEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePaymentLinkStateDto.prototype, "state", void 0);
exports.ChangePaymentLinkStateDto = ChangePaymentLinkStateDto;
//# sourceMappingURL=create-payment-link.dto.js.map