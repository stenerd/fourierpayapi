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
exports.SubscriptionSettingService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../../common/core/service.core");
const subscription_setting_factory_1 = require("../factories/subscription-setting.factory");
const subscription_setting_repository_1 = require("../repositories/subscription-setting.repository");
const subscription_enum_1 = require("../subscription.enum");
let SubscriptionSettingService = class SubscriptionSettingService extends service_core_1.CoreService {
    constructor(repository, factory) {
        super(repository);
        this.repository = repository;
        this.factory = factory;
    }
    async createSubscriptionSetting(dto) {
        if (dto.active) {
            await this.repository.model().updateMany({
                name: dto.name,
                tag: dto.tag,
                active: true,
            }, { active: false });
        }
        const payload = this.factory.createNew(dto);
        const subscription_setting = await this.repository.create(payload);
        return subscription_setting;
    }
    async fetchOneSubscriptionSetting(query) {
        const subscription_setting = await this.repository.findOne(query);
        return subscription_setting;
    }
    async fetchSubscriptionSetting(status) {
        const subscription_settings = await this.repository.find(Object.assign({}, (status && {
            active: status == subscription_enum_1.FetchSubscriptionSettingFilterEnum.ACTIVE,
        })));
        return subscription_settings;
    }
    async changeSubscriptionSettingState(id, dto) {
        const subscription_setting = await this.repository.findOne({ _id: id });
        if (!subscription_setting)
            throw new common_1.BadRequestException('subscription does not exist');
        if (dto.status == subscription_enum_1.FetchSubscriptionSettingFilterEnum.ACTIVE) {
            await this.repository.model().updateMany({
                name: subscription_setting.name,
                tag: subscription_setting.tag,
                active: true,
            }, { active: false });
        }
        await this.repository.model().updateOne({ _id: id }, {
            active: dto.status == subscription_enum_1.FetchSubscriptionSettingFilterEnum.ACTIVE,
        });
        return subscription_setting;
    }
};
SubscriptionSettingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_setting_repository_1.SubscriptionSettingRepository,
        subscription_setting_factory_1.SubscriptionSettingFactory])
], SubscriptionSettingService);
exports.SubscriptionSettingService = SubscriptionSettingService;
//# sourceMappingURL=subscription-setting.service.js.map