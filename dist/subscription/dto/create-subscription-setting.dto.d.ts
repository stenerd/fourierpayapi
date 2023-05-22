import { FetchSubscriptionSettingFilterEnum, SubscriptionNameEnum, SubscriptionTagEnum } from '../subscription.enum';
export declare class CreateSubscriptionSettingDto {
    name: SubscriptionNameEnum;
    tag: SubscriptionTagEnum;
    amount: number;
    active: boolean;
}
export declare class FetchSubscriptionSettingFilterDto {
    status: FetchSubscriptionSettingFilterEnum;
}
export declare class ChangeSubscriptionSettingStateDto {
    status: FetchSubscriptionSettingFilterEnum;
}
export declare class SubscribeDto {
    subscription_setting_id: string;
}
