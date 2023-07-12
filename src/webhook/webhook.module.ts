import { forwardRef, Module } from '@nestjs/common';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserModule } from 'src/user/user.module';
import { PaystackModule } from 'src/paystack/paystack.module';
import { WithdrawalModule } from 'src/withdrawal/withdrawal.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    PaymentLinkModule,
    PaystackModule,
    WithdrawalModule,
    WalletModule,
    PaymentModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}
