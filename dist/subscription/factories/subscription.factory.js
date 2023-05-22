"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const subscription_model_1 = require("../models/subscription.model");
const subscription_enum_1 = require("../subscription.enum");
let SubscriptionFactory = class SubscriptionFactory {
    createNew(user_id, subscription_setting) {
        const subscription = new subscription_model_1.Subscription();
        subscription.user_id = new mongoose_1.Types.ObjectId(user_id);
        subscription.subscription_setting_id = subscription_setting._id;
        subscription.is_active = true;
        subscription.start_date = new Date();
        subscription.expires_on = this.calculateExpiredOn(subscription_setting);
        return subscription;
    }
    calculateExpiredOn(subscription_setting) {
        const result = new Date();
        if (subscription_setting.tag == subscription_enum_1.SubscriptionTagEnum.PREMIUMMONTHLY) {
            result.setMonth(result.getMonth() + 1);
            return result;
        }
        else if (subscription_setting.tag == subscription_enum_1.SubscriptionTagEnum.PREMIUMYEARLY) {
            result.setFullYear(result.getFullYear() + 1);
            return result;
        }
        else {
            return null;
        }
    }
};
SubscriptionFactory = __decorate([
    (0, common_1.Injectable)()
], SubscriptionFactory);
exports.SubscriptionFactory = SubscriptionFactory;
//# sourceMappingURL=subscription.factory.js.map