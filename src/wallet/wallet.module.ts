import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { WalletSchema } from './wallet.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserModule } from 'src/user/user.module';
import { PaystackModule } from 'src/paystack/paystack.module';
import { WithdrawalModule } from 'src/withdrawal/withdrawal.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TransactionModule),
    PaystackModule,
    WithdrawalModule,
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
  exports: [WalletService, WalletRepository],
})
export class WalletModule {}
