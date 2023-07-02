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
exports.AdminPaymentLinkController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../../common/core/controller.core");
const payment_link_service_1 = require("../service/payment-link.service");
const create_payment_link_dto_1 = require("../../payment-link/dto/create-payment-link.dto");
let AdminPaymentLinkController = class AdminPaymentLinkController extends controller_core_1.CoreController {
    constructor(adminPaymentLinkService) {
        super();
        this.adminPaymentLinkService = adminPaymentLinkService;
    }
    async paymentLinks(res, query) {
        const resp = await this.adminPaymentLinkService.paymentLinks(query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async paymentLinksCount(res, query) {
        const resp = await this.adminPaymentLinkService.paymentLinksCount(query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_link_dto_1.ViewPaymentLinkDto]),
    __metadata("design:returntype", Promise)
], AdminPaymentLinkController.prototype, "paymentLinks", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_link_dto_1.ViewPaymentLinkDto]),
    __metadata("design:returntype", Promise)
], AdminPaymentLinkController.prototype, "paymentLinksCount", null);
AdminPaymentLinkController = __decorate([
    (0, common_1.Controller)('admin/payment-links'),
    __metadata("design:paramtypes", [payment_link_service_1.AdminPaymentLinkService])
], AdminPaymentLinkController);
exports.AdminPaymentLinkController = AdminPaymentLinkController;
//# sourceMappingURL=payment-link.controller.js.map