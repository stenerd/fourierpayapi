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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../../common/core/service.core");
const subscription_factory_1 = require("../factories/subscription.factory");
const subscription_setting_repository_1 = require("../repositories/subscription-setting.repository");
const subscription_repository_1 = require("../repositories/subscription.repository");
const subscription_enum_1 = require("../subscription.enum");
let SubscriptionService = class SubscriptionService extends service_core_1.CoreService {
    constructor(repository, subscriptionSettingRepository, factory) {
        super(repository);
        this.repository = repository;
        this.subscriptionSettingRepository = subscriptionSettingRepository;
        this.factory = factory;
    }
    async createSubscription(user_id, subscription_setting_id) {
        const subscription_setting = await this.subscriptionSettingRepository.findOne({
            _id: subscription_setting_id,
        });
        if (!subscription_setting)
            throw new common_1.BadRequestException('Subscription setting does not exist.');
        const existing_subscription = await this.repository.findOne({
            user_id: user_id,
            is_active: true,
        }, {}, {
            populate: ['subscription_setting_id'],
        });
        if (!existing_subscription) {
            const payload = this.factory.createNew(user_id, subscription_setting);
            const subscription = await this.repository.create(payload);
            return subscription;
        }
        if (existing_subscription.subscription_setting_id
            .tag != subscription_enum_1.SubscriptionTagEnum.BASIC)
            throw new common_1.BadRequestException('You already have an existing subscription.');
        if (subscription_setting.tag != subscription_enum_1.SubscriptionTagEnum.BASIC) {
            await this.repository.model().updateOne({ _id: existing_subscription._id }, {
                is_active: false,
            });
            const payload = this.factory.createNew(user_id, subscription_setting);
            const subscription = await this.repository.create(payload);
            return subscription;
        }
        return existing_subscription;
    }
    async fetchSubscriptions(user_id, status = null) {
        const existing_subscriptions = await this.repository.find(Object.assign({ user_id: user_id }, (status && {
            is_active: status == subscription_enum_1.FetchSubscriptionSettingFilterEnum.ACTIVE,
        })), {}, {
            populate: ['subscription_setting_id'],
        });
        return existing_subscriptions;
    }
    async subscribe(user_id, data) {
        await this.createSubscription(user_id, data.subscription_setting_id);
    }
};
SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_repository_1.SubscriptionRepository,
        subscription_setting_repository_1.SubscriptionSettingRepository,
        subscription_factory_1.SubscriptionFactory])
], SubscriptionService);
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map