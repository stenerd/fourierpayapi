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
exports.PaymentLinkAffiliateController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const payment_link_affiliate_service_1 = require("./payment-link-affiliate.service");
const create_payment_affiliate_dto_1 = require("./dto/create-payment-affiliate.dto");
const auth_guards_1 = require("../common/guards/auth.guards");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_enum_1 = require("../user/user.enum");
let PaymentLinkAffiliateController = class PaymentLinkAffiliateController extends controller_core_1.CoreController {
    constructor(paymentLinkAffiliateService) {
        super();
        this.paymentLinkAffiliateService = paymentLinkAffiliateService;
    }
    async create(dto, currentUser, res) {
        const result = await this.paymentLinkAffiliateService.createParticipation(dto, currentUser._id);
        return this.responseSuccess(res, '00', 'Participation created successfully', result, common_1.HttpStatus.CREATED);
    }
    async getByLink(paymentLinkId, currentUser, res) {
        const result = await this.paymentLinkAffiliateService.getByPaymentLink(paymentLinkId, currentUser.role === user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', result, common_1.HttpStatus.OK);
    }
    async getByAffiliate(affiliateId, currentUser, res) {
        const result = await this.paymentLinkAffiliateService.getByAffiliate(affiliateId);
        return this.responseSuccess(res, '00', 'Success', result, common_1.HttpStatus.OK);
    }
    async getDashboard(currentUser, res) {
        const data = await this.paymentLinkAffiliateService.getDashboardData(currentUser._id);
        return this.responseSuccess(res, '00', 'Success', data, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_affiliate_dto_1.CreatePaymentAffiliateDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkAffiliateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/link/:paymentLinkId'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('paymentLinkId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkAffiliateController.prototype, "getByLink", null);
__decorate([
    (0, common_1.Get)('/affiliate/:affiliateId'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Param)('affiliateId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkAffiliateController.prototype, "getByAffiliate", null);
__decorate([
    (0, common_1.Get)('/dashboard'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkAffiliateController.prototype, "getDashboard", null);
PaymentLinkAffiliateController = __decorate([
    (0, common_1.Controller)('payment-link-affiliate'),
    __metadata("design:paramtypes", [payment_link_affiliate_service_1.PaymentLinkAffiliateService])
], PaymentLinkAffiliateController);
exports.PaymentLinkAffiliateController = PaymentLinkAffiliateController;
//# sourceMappingURL=payment-link-affiliate.controller.js.map