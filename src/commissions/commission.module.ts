import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommissionSchema } from './models/commission.model';
import { CommissionRepository } from './repositories/commission.repository';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';
import { PaymentLinkAffiliateModule } from 'src/payment-link-affiliate/payment-link-affiliate.module';
import { UserModule } from 'src/user/user.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Commission', schema: CommissionSchema },
    ]),
    forwardRef(() => PaymentLinkAffiliateModule),
    PaymentLinkModule,
    UserModule,
    SubscriptionModule,
  ],
  controllers: [CommissionController],
  providers: [CommissionService, CommissionRepository],
  exports: [CommissionService, CommissionRepository],
})
export class CommissionModule {}
