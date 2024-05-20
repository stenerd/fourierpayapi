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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const controller_core_1 = require("../common/core/controller.core");
const auth_guards_1 = require("../common/guards/auth.guards");
const initialize_payment_dto_1 = require("./dto/initialize-payment.dto");
const verify_payment_dto_1 = require("./dto/verify-payment.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const view_payment_dto_1 = require("./dto/view-payment.dto");
let PaymentController = class PaymentController extends controller_core_1.CoreController {
    constructor(paymentService) {
        super();
        this.paymentService = paymentService;
    }
    async initializePayment(initializePaymentDto, res) {
        const resp = await this.paymentService.initializePayment(initializePaymentDto);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.CREATED);
    }
    async verifyPayment(dto, res) {
        const resp = await this.paymentService.verifyPayment(dto);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.CREATED);
    }
    async abandonPayment(dto, res) {
        const resp = await this.paymentService.abandonPayment(dto);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.ACCEPTED);
    }
    async getPaymentLink(currentUser, res, code, query) {
        const resp = await this.paymentService.getPaymentByCode(code || '', query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async getExternalPayment(res, code, query) {
        const resp = await this.paymentService.getExternalPayment(code || '', query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async singlePaymentVerification(code, res, unique_answer) {
        const resp = await this.paymentService.singlePaymentVerification(code, unique_answer);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async getPaymentReference(res, reference) {
        const resp = await this.paymentService.getPaymentReference(reference || '');
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Post)('/initialize'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [initialize_payment_dto_1.InitializePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initializePayment", null);
__decorate([
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_payment_dto_1.VerifyPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Put)('/abandon'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_payment_dto_1.VerifyPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "abandonPayment", null);
__decorate([
    (0, common_1.Get)('/:code'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('code')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, view_payment_dto_1.ViewPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentLink", null);
__decorate([
    (0, common_1.Get)('/external-link/:code'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, view_payment_dto_1.ViewPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getExternalPayment", null);
__decorate([
    (0, common_1.Get)('/verify/:code/:unique_answer'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Param)('unique_answer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "singlePaymentVerification", null);
__decorate([
    (0, common_1.Get)('/reciept/:reference'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentReference", null);
PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map