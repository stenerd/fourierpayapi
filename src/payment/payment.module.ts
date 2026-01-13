import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './payment.model';
import { TransactionModule } from 'src/transaction/transaction.module';
import { PaystackModule } from 'src/paystack/paystack.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';
import { PaymentFactory } from './payment.factory';
import { WalletModule } from 'src/wallet/wallet.module';
import { PaymentLinkAffiliateModule } from 'src/payment-link-affiliate/payment-link-affiliate.module';
import { CommissionModule } from 'src/commissions/commission.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    WalletModule,
    forwardRef(() => PaymentLinkAffiliateModule),
    PaystackModule,
    PaymentLinkModule,
    CommissionModule,
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, PaymentFactory],
  exports: [PaymentRepository, PaymentService],
})
export class PaymentModule {}
