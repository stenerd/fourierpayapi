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
exports.CommissionController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const commission_service_1 = require("./commission.service");
const auth_guards_1 = require("../common/guards/auth.guards");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_enum_1 = require("../user/user.enum");
let CommissionController = class CommissionController extends controller_core_1.CoreController {
    constructor(commissionService) {
        super();
        this.commissionService = commissionService;
    }
    async getAffiliateDashboard(currentUser, res) {
        const data = await this.commissionService.getAffiliateDashboard(currentUser._id);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
    async getAllAffiliates(currentUser, res) {
        const data = await this.commissionService.getAllAffiliates(currentUser);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
    async getByPaymentLink(paymentLinkId, currentUser, res) {
        const data = await this.commissionService.getByPaymentLink(paymentLinkId, currentUser.role === user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
    async getByAffiliate(affiliateId, currentUser, res) {
        const data = await this.commissionService.getByAffiliate(affiliateId);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
    async getAll(query, currentUser, res) {
        const data = await this.commissionService.getAll(query, currentUser);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
    async markAsPaid(id, currentUser, res) {
        const data = await this.commissionService.markAsPaid(id, currentUser);
        return this.responseSuccess(res, '00', 'Commission marked as paid', data, common_1.HttpStatus.OK);
    }
    async getAffiliatesForLink(paymentLinkId, currentUser, res) {
        const data = await this.commissionService.getAffiliatesForLink(paymentLinkId);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)('/dashboard'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getAffiliateDashboard", null);
__decorate([
    (0, common_1.Get)('/affiliates'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getAllAffiliates", null);
__decorate([
    (0, common_1.Get)('/link/:paymentLinkId'),
    __param(0, (0, common_1.Param)('paymentLinkId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getByPaymentLink", null);
__decorate([
    (0, common_1.Get)('/affiliate/:affiliateId'),
    __param(0, (0, common_1.Param)('affiliateId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getByAffiliate", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)('/:id/mark-paid'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "markAsPaid", null);
__decorate([
    (0, common_1.Get)('/link/:paymentLinkId/affiliates'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('paymentLinkId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommissionController.prototype, "getAffiliatesForLink", null);
CommissionController = __decorate([
    (0, common_1.Controller)('commission'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __metadata("design:paramtypes", [commission_service_1.CommissionService])
], CommissionController);
exports.CommissionController = CommissionController;
//# sourceMappingURL=commission.controller.js.map