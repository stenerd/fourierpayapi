import { CoreService } from 'src/common/core/service.core';
import { SubscribeDto } from '../dto/create-subscription-setting.dto';
import { SubscriptionFactory } from '../factories/subscription.factory';
import { SubscriptionSettingRepository } from '../repositories/subscription-setting.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { FetchSubscriptionSettingFilterEnum } from '../subscription.enum';
export declare class SubscriptionService extends CoreService<SubscriptionRepository> {
    private readonly repository;
    private readonly subscriptionSettingRepository;
    private readonly factory;
    constructor(repository: SubscriptionRepository, subscriptionSettingRepository: SubscriptionSettingRepository, factory: SubscriptionFactory);
    createSubscription(user_id: string, subscription_setting_id: string): Promise<import("../models/subscription.model").SubscriptionDocument>;
    fetchSubscriptions(user_id: string, status?: FetchSubscriptionSettingFilterEnum): Promise<import("../models/subscription.model").SubscriptionDocument[]>;
    subscribe(user_id: string, data: SubscribeDto): Promise<void>;
}
