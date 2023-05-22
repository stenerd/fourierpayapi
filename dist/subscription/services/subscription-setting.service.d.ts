import { CoreService } from 'src/common/core/service.core';
import { ChangeSubscriptionSettingStateDto, CreateSubscriptionSettingDto } from '../dto/create-subscription-setting.dto';
import { SubscriptionSettingFactory } from '../factories/subscription-setting.factory';
import { SubscriptionSettingRepository } from '../repositories/subscription-setting.repository';
import { FetchSubscriptionSettingFilterEnum } from '../subscription.enum';
export declare class SubscriptionSettingService extends CoreService<SubscriptionSettingRepository> {
    private readonly repository;
    private readonly factory;
    constructor(repository: SubscriptionSettingRepository, factory: SubscriptionSettingFactory);
    createSubscriptionSetting(dto: CreateSubscriptionSettingDto): Promise<import("../models/subscription-setting.model").SubscriptionSettingDocument>;
    fetchOneSubscriptionSetting(query: Record<string, any>): Promise<import("../models/subscription-setting.model").SubscriptionSettingDocument>;
    fetchSubscriptionSetting(status: FetchSubscriptionSettingFilterEnum | null): Promise<import("../models/subscription-setting.model").SubscriptionSettingDocument[]>;
    changeSubscriptionSettingState(id: string, dto: ChangeSubscriptionSettingStateDto): Promise<import("../models/subscription-setting.model").SubscriptionSettingDocument>;
}
