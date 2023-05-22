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
exports.InitializePaymentDto = exports.FormAnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_payment_link_dto_1 = require("../../payment-link/dto/create-payment-link.dto");
class FormAnswerDto extends create_payment_link_dto_1.FormDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FormAnswerDto.prototype, "answer", void 0);
exports.FormAnswerDto = FormAnswerDto;
class InitializePaymentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Payment link id is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InitializePaymentDto.prototype, "payment_link_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Amount is required',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], InitializePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({
        each: true,
    }),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_transformer_1.Type)(() => FormAnswerDto),
    __metadata("design:type", Array)
], InitializePaymentDto.prototype, "form", void 0);
exports.InitializePaymentDto = InitializePaymentDto;
//# sourceMappingURL=initialize-payment.dto.js.map