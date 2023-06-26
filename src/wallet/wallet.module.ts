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
import { UserSchema } from 'src/user/user.model';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TransactionModule),
    PaystackModule,
    WithdrawalModule,
    MongooseModule.forFeature([
      { name: 'Wallet', schema: WalletSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository, UserRepository],
  exports: [WalletService, WalletRepository],
})
export class WalletModule {}
