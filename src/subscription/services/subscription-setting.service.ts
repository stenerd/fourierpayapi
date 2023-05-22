import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import {
  ChangeSubscriptionSettingStateDto,
  CreateSubscriptionSettingDto,
} from '../dto/create-subscription-setting.dto';
import { SubscriptionSettingFactory } from '../factories/subscription-setting.factory';
import { SubscriptionSettingRepository } from '../repositories/subscription-setting.repository';
import { FetchSubscriptionSettingFilterEnum } from '../subscription.enum';

@Injectable()
export class SubscriptionSettingService extends CoreService<SubscriptionSettingRepository> {
  constructor(
    private readonly repository: SubscriptionSettingRepository,
    private readonly factory: SubscriptionSettingFactory,
  ) {
    super(repository);
  }

  async createSubscriptionSetting(dto: CreateSubscriptionSettingDto) {
    if (dto.active) {
      await this.repository.model().updateMany(
        {
          name: dto.name,
          tag: dto.tag,
          active: true,
        },
        { active: false },
      );
    }

    const payload = this.factory.createNew(dto);
    const subscription_setting = await this.repository.create(payload);
    return subscription_setting;
  }

  async fetchOneSubscriptionSetting(query: Record<string, any>) {
    const subscription_setting = await this.repository.findOne(query);
    return subscription_setting;
  }

  async fetchSubscriptionSetting(
    status: FetchSubscriptionSettingFilterEnum | null,
  ) {
    const subscription_settings = await this.repository.find({
      ...(status && {
        active: status == FetchSubscriptionSettingFilterEnum.ACTIVE,
      }),
    });
    return subscription_settings;
  }

  async changeSubscriptionSettingState(
    id: string,
    dto: ChangeSubscriptionSettingStateDto,
  ) {
    const subscription_setting = await this.repository.findOne({ _id: id });

    if (!subscription_setting)
      throw new BadRequestException('subscription does not exist');

    if (dto.status == FetchSubscriptionSettingFilterEnum.ACTIVE) {
      await this.repository.model().updateMany(
        {
          name: subscription_setting.name,
          tag: subscription_setting.tag,
          active: true,
        },
        { active: false },
      );
    }
    await this.repository.model().updateOne(
      { _id: id },
      {
        active: dto.status == FetchSubscriptionSettingFilterEnum.ACTIVE,
      },
    );
    return subscription_setting;
  }
}
