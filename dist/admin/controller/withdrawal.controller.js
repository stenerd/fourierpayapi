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
exports.AdminWithdrawalController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../../common/core/controller.core");
const view_transaction_dto_1 = require("../../transaction/dto/view-transaction.dto");
const withdrawal_service_1 = require("../service/withdrawal.service");
let AdminWithdrawalController = class AdminWithdrawalController extends controller_core_1.CoreController {
    constructor(adminWithdrawalService) {
        super();
        this.adminWithdrawalService = adminWithdrawalService;
    }
    async withdrawals(res, query) {
        const resp = await this.adminWithdrawalService.withdrawals(query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, view_transaction_dto_1.ViewTransactionDto]),
    __metadata("design:returntype", Promise)
], AdminWithdrawalController.prototype, "withdrawals", null);
AdminWithdrawalController = __decorate([
    (0, common_1.Controller)('admin/withdrawals'),
    __metadata("design:paramtypes", [withdrawal_service_1.AdminWithdrawalService])
], AdminWithdrawalController);
exports.AdminWithdrawalController = AdminWithdrawalController;
//# sourceMappingURL=withdrawal.controller.js.map