import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from 'src/transaction/transaction.module';
import { PaystackModule } from 'src/paystack/paystack.module';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { SchoolSessionSettingSchema } from './models/school-session-setting.model';
import { SchoolSessionSchema } from './models/school-session.model';
import { SchoolSessionSettingRepository } from './repositories/school-session-setting.repository';
import { SchoolSessionRepository } from './repositories/school-session.repository';
import { SchoolSessionFactory } from './factories/school-session.factory';
import { SchoolSessionSettingFactory } from './factories/school-session-setting.factory';
import { SchoolSessionService } from './school-session.service';
import { SchoolTermRepository } from './repositories/school-term.repository';
import { SchoolTermFactory } from './factories/school-term.factory';
import { SchoolTermSchema } from './models/school-term.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SchoolSessionSetting', schema: SchoolSessionSettingSchema },
      { name: 'SchoolSession', schema: SchoolSessionSchema },
      { name: 'SchoolTerm', schema: SchoolTermSchema },
    ]),
  ],
  controllers: [],
  providers: [
    SchoolSessionSettingRepository,
    SchoolSessionRepository,
    SchoolTermRepository,
    SchoolSessionFactory,
    SchoolSessionSettingFactory,
    SchoolTermFactory,
    SchoolSessionService,
  ],
  exports: [SchoolSessionService],
})
export class SchoolSessionModule {}
