"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const commission_model_1 = require("./models/commission.model");
const commission_repository_1 = require("./repositories/commission.repository");
const commission_service_1 = require("./commission.service");
const commission_controller_1 = require("./commission.controller");
const payment_link_affiliate_module_1 = require("../payment-link-affiliate/payment-link-affiliate.module");
const user_module_1 = require("../user/user.module");
const subscription_module_1 = require("../subscription/subscription.module");
let CommissionModule = class CommissionModule {
};
CommissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Commission', schema: commission_model_1.CommissionSchema },
            ]),
            (0, common_1.forwardRef)(() => payment_link_affiliate_module_1.PaymentLinkAffiliateModule),
            user_module_1.UserModule,
            subscription_module_1.SubscriptionModule,
        ],
        controllers: [commission_controller_1.CommissionController],
        providers: [commission_service_1.CommissionService, commission_repository_1.CommissionRepository],
        exports: [commission_service_1.CommissionService],
    })
], CommissionModule);
exports.CommissionModule = CommissionModule;
//# sourceMappingURL=commission.module.js.map