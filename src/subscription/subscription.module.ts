import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { SubscriptionSettingSchema } from './models/subscription-setting.model';
import { SubscriptionSettingRepository } from './repositories/subscription-setting.repository';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionSettingService } from './services/subscription-setting.service';
import { SubscriptionSettingController } from './controllers/subscription-setting.controller';
import { SubscriptionSettingFactory } from './factories/subscription-setting.factory';
import { SubscriptionSchema } from './models/subscription.model';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { SubscriptionFactory } from './factories/subscription.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SubscriptionSetting', schema: SubscriptionSettingSchema },
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
  ],
  controllers: [SubscriptionSettingController],
  providers: [
    SubscriptionService,
    SubscriptionSettingService,
    SubscriptionSettingRepository,
    SubscriptionRepository,
    SubscriptionSettingFactory,
    SubscriptionFactory,
  ],
  exports: [
    SubscriptionService,
    SubscriptionSettingService,
    SubscriptionSettingRepository,
    SubscriptionRepository,
    SubscriptionSettingFactory,
    SubscriptionFactory,
  ],
})
export class SubscriptionModule {}
