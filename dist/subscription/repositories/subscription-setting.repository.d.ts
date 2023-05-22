import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SubscriptionSettingDocument } from '../models/subscription-setting.model';
export declare class SubscriptionSettingRepository extends CoreRepository<SubscriptionSettingDocument> {
    constructor(subscriptionSettingModel: Model<SubscriptionSettingDocument>);
}
