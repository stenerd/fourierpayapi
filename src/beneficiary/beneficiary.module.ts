import { Module } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryController } from './beneficiary.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BeneficiarySchema } from './beneficiary.model';
import { BeneficiaryRepository } from './beneficiary.repository';
import { PaystackModule } from 'src/paystack/paystack.module';

@Module({
  imports: [
    UserModule,
    PaystackModule,
    MongooseModule.forFeature([
      { name: 'Beneficiary', schema: BeneficiarySchema },
    ]),
  ],
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService, BeneficiaryRepository],
})
export class BeneficiaryModule {}
