import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SubscriptionSettingDocument } from '../models/subscription-setting.model';

@Injectable()
export class SubscriptionSettingRepository extends CoreRepository<SubscriptionSettingDocument> {
  constructor(
    @InjectModel('SubscriptionSetting')
    subscriptionSettingModel: Model<SubscriptionSettingDocument>,
  ) {
    super(subscriptionSettingModel);
  }
}
