import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SubscriptionDocument } from '../models/subscription.model';
export declare class SubscriptionRepository extends CoreRepository<SubscriptionDocument> {
    constructor(subscriptionModel: Model<SubscriptionDocument>);
}
