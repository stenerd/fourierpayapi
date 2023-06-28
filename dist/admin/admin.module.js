"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const user_controller_1 = require("./controller/user.controller");
const user_service_1 = require("./service/user.service");
const dashboard_controller_1 = require("./controller/dashboard.controller");
const dashboard_service_1 = require("./service/dashboard.service");
const transaction_module_1 = require("../transaction/transaction.module");
const payment_link_module_1 = require("../payment-link/payment-link.module");
const withdrawal_module_1 = require("../withdrawal/withdrawal.module");
const transaction_controller_1 = require("./controller/transaction.controller");
const transaction_service_1 = require("./service/transaction.service");
const withdrawal_controller_1 = require("./controller/withdrawal.controller");
const withdrawal_service_1 = require("./service/withdrawal.service");
const payment_link_controller_1 = require("./controller/payment-link.controller");
const payment_link_service_1 = require("./service/payment-link.service");
const auth_controller_1 = require("./controller/auth.controller");
const auth_service_1 = require("./service/auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('jwt.JWT_AUTH_SECRET'),
                }),
            }),
            user_module_1.UserModule,
            transaction_module_1.TransactionModule,
            payment_link_module_1.PaymentLinkModule,
            withdrawal_module_1.WithdrawalModule,
        ],
        controllers: [
            user_controller_1.AdminUserController,
            dashboard_controller_1.AdminDashboardController,
            transaction_controller_1.AdminTransactionController,
            withdrawal_controller_1.AdminWithdrawalController,
            payment_link_controller_1.AdminPaymentLinkController,
            auth_controller_1.AdminAuthController,
        ],
        providers: [
            user_service_1.AdminUserService,
            dashboard_service_1.AdminDashboardService,
            transaction_service_1.AdminTransactionService,
            withdrawal_service_1.AdminWithdrawalService,
            payment_link_service_1.AdminPaymentLinkService,
            auth_service_1.AdminAuthService,
        ],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map