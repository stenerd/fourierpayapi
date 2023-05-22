import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalSchema } from './withdrawal.model';
import { WithdrawalRepository } from './withdrawal.repository';
import { WithdrawalService } from './withdrawal.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      { name: 'Withdrawal', schema: WithdrawalSchema },
    ]),
  ],
  controllers: [WithdrawalController],
  providers: [WithdrawalRepository, WithdrawalService],
  exports: [WithdrawalRepository, WithdrawalService],
})
export class WithdrawalModule {}
