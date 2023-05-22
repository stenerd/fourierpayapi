"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_controller_1 = require("./payment.controller");
const payment_repository_1 = require("./payment.repository");
const user_module_1 = require("../user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const payment_model_1 = require("./payment.model");
const transaction_module_1 = require("../transaction/transaction.module");
const paystack_module_1 = require("../paystack/paystack.module");
const payment_link_module_1 = require("../payment-link/payment-link.module");
const payment_factory_1 = require("./payment.factory");
const wallet_module_1 = require("../wallet/wallet.module");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            transaction_module_1.TransactionModule,
            wallet_module_1.WalletModule,
            paystack_module_1.PaystackModule,
            payment_link_module_1.PaymentLinkModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Payment', schema: payment_model_1.PaymentSchema }]),
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService, payment_repository_1.PaymentRepository, payment_factory_1.PaymentFactory],
        exports: [payment_repository_1.PaymentRepository],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map