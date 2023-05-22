"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const subscription_setting_model_1 = require("./models/subscription-setting.model");
const subscription_setting_repository_1 = require("./repositories/subscription-setting.repository");
const subscription_service_1 = require("./services/subscription.service");
const subscription_setting_service_1 = require("./services/subscription-setting.service");
const subscription_setting_controller_1 = require("./controllers/subscription-setting.controller");
const subscription_setting_factory_1 = require("./factories/subscription-setting.factory");
const subscription_model_1 = require("./models/subscription.model");
const subscription_repository_1 = require("./repositories/subscription.repository");
const subscription_factory_1 = require("./factories/subscription.factory");
let SubscriptionModule = class SubscriptionModule {
};
SubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'SubscriptionSetting', schema: subscription_setting_model_1.SubscriptionSettingSchema },
                { name: 'Subscription', schema: subscription_model_1.SubscriptionSchema },
            ]),
        ],
        controllers: [subscription_setting_controller_1.SubscriptionSettingController],
        providers: [
            subscription_service_1.SubscriptionService,
            subscription_setting_service_1.SubscriptionSettingService,
            subscription_setting_repository_1.SubscriptionSettingRepository,
            subscription_repository_1.SubscriptionRepository,
            subscription_setting_factory_1.SubscriptionSettingFactory,
            subscription_factory_1.SubscriptionFactory,
        ],
        exports: [
            subscription_service_1.SubscriptionService,
            subscription_setting_service_1.SubscriptionSettingService,
            subscription_setting_repository_1.SubscriptionSettingRepository,
            subscription_repository_1.SubscriptionRepository,
            subscription_setting_factory_1.SubscriptionSettingFactory,
            subscription_factory_1.SubscriptionFactory,
        ],
    })
], SubscriptionModule);
exports.SubscriptionModule = SubscriptionModule;
//# sourceMappingURL=subscription.module.js.map