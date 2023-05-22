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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const paystack_service_1 = require("./paystack.service");
const resolve_account_number_dto_1 = require("./dto/resolve-account-number.dto");
let PaystackController = class PaystackController extends controller_core_1.CoreController {
    constructor(paystackService) {
        super();
        this.paystackService = paystackService;
    }
    async fetchBankList(res) {
        const bank_list = await this.paystackService.fetchBankList();
        return this.responseSuccess(res, '00', 'Success', bank_list, common_1.HttpStatus.OK);
    }
    async resolveAccountNumber(res, dto) {
        const bank_list = await this.paystackService.resolveAccountNumber(dto);
        return this.responseSuccess(res, '00', 'Success', bank_list, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)('/bank-list'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "fetchBankList", null);
__decorate([
    (0, common_1.Get)('/resolve-account-number'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resolve_account_number_dto_1.ResolveAccountNumberDto]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "resolveAccountNumber", null);
PaystackController = __decorate([
    (0, common_1.Controller)('paystack'),
    __metadata("design:paramtypes", [paystack_service_1.PaystackService])
], PaystackController);
exports.PaystackController = PaystackController;
//# sourceMappingURL=paystack.controller.js.map