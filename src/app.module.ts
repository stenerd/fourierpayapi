import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentLinkModule } from './payment-link/payment-link.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentModule } from './payment/payment.module';
import { PaystackModule } from './paystack/paystack.module';
import { WalletModule } from './wallet/wallet.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { LinkModule } from './link/link.module';
import configuration from './config/configuration';
import * as leanVirtuals from 'mongoose-lean-virtuals';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { SubscriptionModule } from './subscription/subscription.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { QRCodeModule } from './qrcode/qrcode.module';
import { JobModule } from './job/job.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { WebhookModule } from './webhook/webhook.module';
import { SchoolModule } from './school/school.module';
const config = configuration();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('DB_URI');

        return {
          uri,
          retryAttempts: 3,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectionFactory: (connection) => {
            connection.plugin(leanVirtuals);
            return connection;
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    MailerModule.forRoot({
      transport: {
        host: config.EMAIL_HOST,
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS,
        },
        secureConnection: false,
        tls: {
          ciphers: 'SSLv3',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@fourierpay.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    AuthModule,
    PaymentLinkModule,
    TransactionModule,
    PaymentModule,
    PaystackModule,
    WalletModule,
    BeneficiaryModule,
    DashboardModule,
    WithdrawalModule,
    LinkModule,
    SubscriptionModule,
    CloudinaryModule,
    QRCodeModule,
    JobModule,
    AdminModule,
    WebhookModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [CloudinaryService],
})
export class AppModule {}
