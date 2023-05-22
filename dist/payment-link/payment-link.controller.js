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
exports.PaymentLinkController = void 0;
const common_1 = require("@nestjs/common");
const payment_link_service_1 = require("./payment-link.service");
const create_payment_link_dto_1 = require("./dto/create-payment-link.dto");
const controller_core_1 = require("../common/core/controller.core");
const auth_guards_1 = require("../common/guards/auth.guards");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_enum_1 = require("../user/user.enum");
const platform_express_1 = require("@nestjs/platform-express");
const view_payment_dto_1 = require("../payment/dto/view-payment.dto");
let PaymentLinkController = class PaymentLinkController extends controller_core_1.CoreController {
    constructor(paymentLinkService) {
        super();
        this.paymentLinkService = paymentLinkService;
    }
    async createPaymentLink(createUserDto, currentUser, res) {
        await this.paymentLinkService.createPaymentLink(createUserDto, currentUser._id);
        return this.responseSuccess(res, '00', 'Success', createUserDto, common_1.HttpStatus.CREATED);
    }
    async changePaymentLinkStatus(dto, currentUser, code, res) {
        await this.paymentLinkService.changePaymentLinkStatus(dto, code, currentUser._id);
        return this.responseSuccess(res, '00', 'Success', dto, common_1.HttpStatus.ACCEPTED);
    }
    async changePaymentLinkToPublicState(currentUser, code, res) {
        await this.paymentLinkService.changePaymentLinkToPublicState(code, currentUser._id);
        return this.responseSuccess(res, '00', 'Success', {}, common_1.HttpStatus.ACCEPTED);
    }
    async changePaymentLinkToPrivateState(currentUser, file, code, res) {
        await this.paymentLinkService.changePaymentLinkToPrivateState(file, code, currentUser._id, file.buffer);
        return this.responseSuccess(res, '00', 'Success', {}, common_1.HttpStatus.CREATED);
    }
    async getPayerSheet(currentUser, code, res, query) {
        const resp = await this.paymentLinkService.getPayerSheet(code, query, currentUser.role == user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async activatePublicLink(currentUser, code, res) {
        const resp = await this.paymentLinkService.activatePublicLink(code, currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async getPaymentLink(currentUser, res) {
        const resp = await this.paymentLinkService.getPaymentLink(currentUser.role == user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async singlePaymentLink(res, code) {
        const resp = await this.paymentLinkService.singlePaymentLink(code);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_link_dto_1.CreatePaymentLinkDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "createPaymentLink", null);
__decorate([
    (0, common_1.Put)('/change-status/:code'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('code')),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_link_dto_1.ChangePaymentLinkStatusDto, Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "changePaymentLinkStatus", null);
__decorate([
    (0, common_1.Put)('/set-public/:code'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "changePaymentLinkToPublicState", null);
__decorate([
    (0, common_1.Post)('/set-private/:code'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('code')),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "changePaymentLinkToPrivateState", null);
__decorate([
    (0, common_1.Get)('/:code/payers-sheet'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, view_payment_dto_1.ViewPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "getPayerSheet", null);
__decorate([
    (0, common_1.Put)('/:code/change-public-link-state'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "activatePublicLink", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "getPaymentLink", null);
__decorate([
    (0, common_1.Get)('/:code'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentLinkController.prototype, "singlePaymentLink", null);
PaymentLinkController = __decorate([
    (0, common_1.Controller)('payment-link'),
    __metadata("design:paramtypes", [payment_link_service_1.PaymentLinkService])
], PaymentLinkController);
exports.PaymentLinkController = PaymentLinkController;
//# sourceMappingURL=payment-link.controller.js.map