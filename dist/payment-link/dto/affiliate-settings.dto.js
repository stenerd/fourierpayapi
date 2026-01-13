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
exports.AffiliateSettingsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AffiliateSettingsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'Enable or disable affiliate program for this link',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AffiliateSettingsDto.prototype, "affiliateEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Fixed commission amount for Tier 1 (direct affiliate)',
        example: 5000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AffiliateSettingsDto.prototype, "tier1FixedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Fixed commission amount for Tier 2 (recruiter)',
        example: 2000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AffiliateSettingsDto.prototype, "tier2FixedAmount", void 0);
exports.AffiliateSettingsDto = AffiliateSettingsDto;
//# sourceMappingURL=affiliate-settings.dto.js.map