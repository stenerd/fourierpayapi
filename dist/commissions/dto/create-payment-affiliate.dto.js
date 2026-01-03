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
exports.UpdatePaymentAffiliateDto = exports.CreatePaymentAffiliateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePaymentAffiliateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Payment link ID (ObjectId)',
        example: '64f1a2b3c4d5e6f7g8h9i0j2',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentAffiliateDto.prototype, "paymentLinkId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Optional parent affiliate code from ?ref= in URL (for Tier 2)',
        required: false,
        example: 'AFF123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim().toUpperCase()),
    __metadata("design:type", String)
], CreatePaymentAffiliateDto.prototype, "parentAffiliateCode", void 0);
exports.CreatePaymentAffiliateDto = CreatePaymentAffiliateDto;
class UpdatePaymentAffiliateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Updated fixed commission amount (optional)',
        example: 6000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePaymentAffiliateDto.prototype, "commissionAmount", void 0);
exports.UpdatePaymentAffiliateDto = UpdatePaymentAffiliateDto;
//# sourceMappingURL=create-payment-affiliate.dto.js.map