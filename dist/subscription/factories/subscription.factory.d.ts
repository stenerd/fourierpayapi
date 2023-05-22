import { SubscriptionSetting } from '../models/subscription-setting.model';
export declare class SubscriptionFactory {
    createNew(user_id: string, subscription_setting: SubscriptionSetting): Record<string, any>;
    calculateExpiredOn(subscription_setting: SubscriptionSetting): Date;
}
