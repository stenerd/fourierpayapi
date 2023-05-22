import { Injectable } from '@nestjs/common';
import { CreateSubscriptionSettingDto } from '../dto/create-subscription-setting.dto';
import { SubscriptionSetting } from '../models/subscription-setting.model';

@Injectable()
export class SubscriptionSettingFactory {
  createNew(data: CreateSubscriptionSettingDto): Record<string, any> {
    const subscription_setting = new SubscriptionSetting();

    for (const [key, value] of Object.entries(data)) {
      subscription_setting[key] = value;
    }

    return subscription_setting;
  }
}
