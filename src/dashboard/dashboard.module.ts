import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PaymentModule } from 'src/payment/payment.module';
import { UserModule } from 'src/user/user.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { WithdrawalModule } from 'src/withdrawal/withdrawal.module';
import { LinkModule } from 'src/link/link.module';

@Module({
  imports: [
    UserModule,
    PaymentModule,
    PaymentLinkModule,
    TransactionModule,
    WithdrawalModule,
    LinkModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
