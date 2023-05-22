import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SubscriptionSetting } from '../models/subscription-setting.model';
import { Subscription } from '../models/subscription.model';
import {
  SubscriptionNameEnum,
  SubscriptionTagEnum,
} from '../subscription.enum';

@Injectable()
export class SubscriptionFactory {
  createNew(
    user_id: string,
    subscription_setting: SubscriptionSetting,
  ): Record<string, any> {
    const subscription = new Subscription();

    subscription.user_id = new Types.ObjectId(user_id);
    subscription.subscription_setting_id = subscription_setting._id;
    subscription.is_active = true;
    subscription.start_date = new Date();
    subscription.expires_on = this.calculateExpiredOn(subscription_setting);

    return subscription;
  }

  calculateExpiredOn(subscription_setting: SubscriptionSetting) {
    const result = new Date();
    if (subscription_setting.tag == SubscriptionTagEnum.PREMIUMMONTHLY) {
      result.setMonth(result.getMonth() + 1);
      return result;
    } else if (subscription_setting.tag == SubscriptionTagEnum.PREMIUMYEARLY) {
      result.setFullYear(result.getFullYear() + 1);
      return result;
    } else {
      return null;
    }
  }
}
