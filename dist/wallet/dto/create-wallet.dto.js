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
exports.walletWithdrawalDto = exports.CreateWalletDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateWalletDto {
}
exports.CreateWalletDto = CreateWalletDto;
class walletWithdrawalDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Amount is required',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], walletWithdrawalDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Account Number is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], walletWithdrawalDto.prototype, "account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Bank Code is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], walletWithdrawalDto.prototype, "bank_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Bank Name is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], walletWithdrawalDto.prototype, "bank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Name is required',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], walletWithdrawalDto.prototype, "name", void 0);
exports.walletWithdrawalDto = walletWithdrawalDto;
//# sourceMappingURL=create-wallet.dto.js.map