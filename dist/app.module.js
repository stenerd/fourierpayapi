"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const payment_link_module_1 = require("./payment-link/payment-link.module");
const transaction_module_1 = require("./transaction/transaction.module");
const payment_module_1 = require("./payment/payment.module");
const paystack_module_1 = require("./paystack/paystack.module");
const wallet_module_1 = require("./wallet/wallet.module");
const beneficiary_module_1 = require("./beneficiary/beneficiary.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const withdrawal_module_1 = require("./withdrawal/withdrawal.module");
const link_module_1 = require("./link/link.module");
const configuration_1 = require("./config/configuration");
const leanVirtuals = require("mongoose-lean-virtuals");
const mailer_1 = require("@nestjs-modules/mailer");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const subscription_module_1 = require("./subscription/subscription.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const cloudinary_service_1 = require("./cloudinary/cloudinary.service");
const app_controller_1 = require("./app.controller");
const qrcode_module_1 = require("./qrcode/qrcode.module");
const job_module_1 = require("./job/job.module");
const schedule_1 = require("@nestjs/schedule");
const admin_module_1 = require("./admin/admin.module");
const webhook_module_1 = require("./webhook/webhook.module");
const school_module_1 = require("./school/school.module");
const metadata_module_1 = require("./metadata/metadata.module");
const database_module_1 = require("./database/database.module");
const settings_module_1 = require("./settings/settings.module");
const config = (0, configuration_1.default)();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => {
                    const uri = config.get('DB_URI');
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
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [configuration_1.default],
            }),
            mailer_1.MailerModule.forRoot({
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
                    adapter: new ejs_adapter_1.EjsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            payment_link_module_1.PaymentLinkModule,
            transaction_module_1.TransactionModule,
            payment_module_1.PaymentModule,
            paystack_module_1.PaystackModule,
            wallet_module_1.WalletModule,
            beneficiary_module_1.BeneficiaryModule,
            dashboard_module_1.DashboardModule,
            withdrawal_module_1.WithdrawalModule,
            link_module_1.LinkModule,
            subscription_module_1.SubscriptionModule,
            cloudinary_module_1.CloudinaryModule,
            qrcode_module_1.QRCodeModule,
            job_module_1.JobModule,
            admin_module_1.AdminModule,
            webhook_module_1.WebhookModule,
            school_module_1.SchoolModule,
            metadata_module_1.MetadataModule,
            database_module_1.DatabaseModule,
            settings_module_1.SettingsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [cloudinary_service_1.CloudinaryService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map