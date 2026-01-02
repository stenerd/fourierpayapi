import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentLinkAffiliateController } from './payment-link-affiliate.controller';
import { PaymentLinkAffiliateService } from './payment-link-affiliate.service';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { PaymentAffiliateSchema } from './models/payment-link-affiliate.model';
import { UserModule } from 'src/user/user.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PaymentAffiliate', schema: PaymentAffiliateSchema },
    ]),
    UserModule,
    PaymentModule,
    PaymentLinkModule,
  ],
  controllers: [PaymentLinkAffiliateController],
  providers: [PaymentLinkAffiliateService, PaymentAffiliateRepository],
  exports: [PaymentLinkAffiliateService, PaymentAffiliateRepository],
})
export class PaymentLinkAffiliateModule {}
