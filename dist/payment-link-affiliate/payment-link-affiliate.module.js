"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinkAffiliateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payment_link_affiliate_controller_1 = require("./payment-link-affiliate.controller");
const payment_link_affiliate_service_1 = require("./payment-link-affiliate.service");
const payment_link_affiliate_repository_1 = require("./repositories/payment-link-affiliate.repository");
const payment_link_affiliate_model_1 = require("./models/payment-link-affiliate.model");
const user_module_1 = require("../user/user.module");
const payment_link_module_1 = require("../payment-link/payment-link.module");
const payment_module_1 = require("../payment/payment.module");
const commission_module_1 = require("../commissions/commission.module");
let PaymentLinkAffiliateModule = class PaymentLinkAffiliateModule {
};
PaymentLinkAffiliateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'PaymentAffiliate', schema: payment_link_affiliate_model_1.PaymentAffiliateSchema },
            ]),
            user_module_1.UserModule,
            payment_link_module_1.PaymentLinkModule,
            payment_module_1.PaymentModule,
            (0, common_1.forwardRef)(() => commission_module_1.CommissionModule),
        ],
        controllers: [payment_link_affiliate_controller_1.PaymentLinkAffiliateController],
        providers: [payment_link_affiliate_service_1.PaymentLinkAffiliateService, payment_link_affiliate_repository_1.PaymentAffiliateRepository],
        exports: [payment_link_affiliate_service_1.PaymentLinkAffiliateService, payment_link_affiliate_repository_1.PaymentAffiliateRepository],
    })
], PaymentLinkAffiliateModule);
exports.PaymentLinkAffiliateModule = PaymentLinkAffiliateModule;
//# sourceMappingURL=payment-link-affiliate.module.js.map