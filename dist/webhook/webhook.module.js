"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_module_1 = require("../transaction/transaction.module");
const user_module_1 = require("../user/user.module");
const paystack_module_1 = require("../paystack/paystack.module");
const withdrawal_module_1 = require("../withdrawal/withdrawal.module");
const payment_link_module_1 = require("../payment-link/payment-link.module");
const webhook_controller_1 = require("./webhook.controller");
const webhook_service_1 = require("./webhook.service");
const wallet_module_1 = require("../wallet/wallet.module");
const payment_module_1 = require("../payment/payment.module");
let WebhookModule = class WebhookModule {
};
WebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            transaction_module_1.TransactionModule,
            payment_link_module_1.PaymentLinkModule,
            paystack_module_1.PaystackModule,
            withdrawal_module_1.WithdrawalModule,
            wallet_module_1.WalletModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [webhook_controller_1.WebhookController],
        providers: [webhook_service_1.WebhookService],
        exports: [webhook_service_1.WebhookService],
    })
], WebhookModule);
exports.WebhookModule = WebhookModule;
//# sourceMappingURL=webhook.module.js.map