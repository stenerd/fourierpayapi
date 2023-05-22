import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SubscriptionDocument } from '../models/subscription.model';

@Injectable()
export class SubscriptionRepository extends CoreRepository<SubscriptionDocument> {
  constructor(
    @InjectModel('Subscription')
    subscriptionModel: Model<SubscriptionDocument>,
  ) {
    super(subscriptionModel);
  }
}
