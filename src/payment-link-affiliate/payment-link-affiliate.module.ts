import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentLinkAffiliateController } from './payment-link-affiliate.controller';
import { PaymentLinkAffiliateService } from './payment-link-affiliate.service';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { PaymentAffiliateSchema } from './models/payment-link-affiliate.model';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PaymentAffiliate', schema: PaymentAffiliateSchema },
    ]),
  ],
  controllers: [PaymentLinkAffiliateController],
  providers: [
    PaymentLinkAffiliateService,
    PaymentAffiliateRepository,
    UserRepository,
    PaymentLinkRepository,
  ],
  exports: [PaymentLinkAffiliateService, PaymentAffiliateRepository],
})
export class PaymentLinkAffiliateModule {}
