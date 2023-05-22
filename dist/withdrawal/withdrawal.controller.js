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
exports.WithdrawalController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const auth_guards_1 = require("../common/guards/auth.guards");
const withdrawal_dto_1 = require("./withdrawal.dto");
const withdrawal_service_1 = require("./withdrawal.service");
let WithdrawalController = class WithdrawalController extends controller_core_1.CoreController {
    constructor(withdrawalService) {
        super();
        this.withdrawalService = withdrawalService;
    }
    async fetchProfileWithdrawal(currentUser, res) {
        const resp = await this.withdrawalService.fetchProfileWithdrawal(currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async fetchWithdrawal(currentUser, res, query) {
        const resp = await this.withdrawalService.fetchWithdrawal(currentUser._id, query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "fetchProfileWithdrawal", null);
__decorate([
    (0, common_1.Get)('/view'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, withdrawal_dto_1.ViewWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "fetchWithdrawal", null);
WithdrawalController = __decorate([
    (0, common_1.Controller)('withdrawal'),
    __metadata("design:paramtypes", [withdrawal_service_1.WithdrawalService])
], WithdrawalController);
exports.WithdrawalController = WithdrawalController;
//# sourceMappingURL=withdrawal.controller.js.map