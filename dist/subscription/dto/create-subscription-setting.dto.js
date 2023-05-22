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
exports.SubscribeDto = exports.ChangeSubscriptionSettingStateDto = exports.FetchSubscriptionSettingFilterDto = exports.CreateSubscriptionSettingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const subscription_enum_1 = require("../subscription.enum");
class CreateSubscriptionSettingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Name is required',
    }),
    (0, class_validator_1.IsEnum)(subscription_enum_1.SubscriptionNameEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubscriptionSettingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Tag is required',
    }),
    (0, class_validator_1.IsEnum)(subscription_enum_1.SubscriptionTagEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubscriptionSettingDto.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSubscriptionSettingDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSubscriptionSettingDto.prototype, "active", void 0);
exports.CreateSubscriptionSettingDto = CreateSubscriptionSettingDto;
class FetchSubscriptionSettingFilterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(subscription_enum_1.FetchSubscriptionSettingFilterEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchSubscriptionSettingFilterDto.prototype, "status", void 0);
exports.FetchSubscriptionSettingFilterDto = FetchSubscriptionSettingFilterDto;
class ChangeSubscriptionSettingStateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(subscription_enum_1.FetchSubscriptionSettingFilterEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangeSubscriptionSettingStateDto.prototype, "status", void 0);
exports.ChangeSubscriptionSettingStateDto = ChangeSubscriptionSettingStateDto;
class SubscribeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubscribeDto.prototype, "subscription_setting_id", void 0);
exports.SubscribeDto = SubscribeDto;
//# sourceMappingURL=create-subscription-setting.dto.js.map