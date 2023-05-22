import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { SubscribeDto } from '../dto/create-subscription-setting.dto';
import { SubscriptionFactory } from '../factories/subscription.factory';
import { SubscriptionSetting } from '../models/subscription-setting.model';
import { SubscriptionSettingRepository } from '../repositories/subscription-setting.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import {
  FetchSubscriptionSettingFilterEnum,
  SubscriptionTagEnum,
} from '../subscription.enum';

@Injectable()
export class SubscriptionService extends CoreService<SubscriptionRepository> {
  constructor(
    private readonly repository: SubscriptionRepository,
    private readonly subscriptionSettingRepository: SubscriptionSettingRepository,
    private readonly factory: SubscriptionFactory,
  ) {
    super(repository);
  }

  async createSubscription(user_id: string, subscription_setting_id: string) {
    const subscription_setting =
      await this.subscriptionSettingRepository.findOne({
        _id: subscription_setting_id,
      });
    if (!subscription_setting)
      throw new BadRequestException('Subscription setting does not exist.');

    const existing_subscription = await this.repository.findOne(
      {
        user_id: user_id,
        is_active: true,
      },
      {},
      {
        populate: ['subscription_setting_id'],
      },
    );

    if (!existing_subscription) {
      const payload = this.factory.createNew(user_id, subscription_setting);
      const subscription = await this.repository.create(payload);
      return subscription;
    }

    if (
      (existing_subscription.subscription_setting_id as Record<string, any>)
        .tag != SubscriptionTagEnum.BASIC
    )
      throw new BadRequestException(
        'You already have an existing subscription.',
      );

    if (subscription_setting.tag != SubscriptionTagEnum.BASIC) {
      await this.repository.model().updateOne(
        { _id: existing_subscription._id },
        {
          is_active: false,
        },
      );
      const payload = this.factory.createNew(user_id, subscription_setting);
      const subscription = await this.repository.create(payload);
      return subscription;
    }

    return existing_subscription;
  }

  async fetchSubscriptions(
    user_id: string,
    status: FetchSubscriptionSettingFilterEnum = null,
  ) {
    const existing_subscriptions = await this.repository.find(
      {
        user_id: user_id,
        ...(status && {
          is_active: status == FetchSubscriptionSettingFilterEnum.ACTIVE,
        }),
      },
      {},
      {
        populate: ['subscription_setting_id'],
      },
    );

    return existing_subscriptions;
  }

  async subscribe(user_id: string, data: SubscribeDto) {
    await this.createSubscription(user_id, data.subscription_setting_id);
  }
}
