import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AdminUserController } from './controller/user.controller';
import { AdminUserService } from './service/user.service';
import { AdminDashboardController } from './controller/dashboard.controller';
import { AdminDashboardService } from './service/dashboard.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';
import { WithdrawalModule } from 'src/withdrawal/withdrawal.module';
import { AdminTransactionController } from './controller/transaction.controller';
import { AdminTransactionService } from './service/transaction.service';
import { AdminWithdrawalController } from './controller/withdrawal.controller';
import { AdminWithdrawalService } from './service/withdrawal.service';
import { AdminPaymentLinkController } from './controller/payment-link.controller';
import { AdminPaymentLinkService } from './service/payment-link.service';
import { AdminAuthController } from './controller/auth.controller';
import { AdminAuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.JWT_AUTH_SECRET'),
      }),
    }),
    UserModule,
    TransactionModule,
    PaymentLinkModule,
    WithdrawalModule,
  ],
  controllers: [
    AdminUserController,
    AdminDashboardController,
    AdminTransactionController,
    AdminWithdrawalController,
    AdminPaymentLinkController,
    AdminAuthController,
  ],
  providers: [
    AdminUserService,
    AdminDashboardService,
    AdminTransactionService,
    AdminWithdrawalService,
    AdminPaymentLinkService,
    AdminAuthService,
  ],
})
export class AdminModule {}
