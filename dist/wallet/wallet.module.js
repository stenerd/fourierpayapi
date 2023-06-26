"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const wallet_controller_1 = require("./wallet.controller");
const wallet_repository_1 = require("./wallet.repository");
const wallet_model_1 = require("./wallet.model");
const mongoose_1 = require("@nestjs/mongoose");
const transaction_module_1 = require("../transaction/transaction.module");
const user_module_1 = require("../user/user.module");
const paystack_module_1 = require("../paystack/paystack.module");
const withdrawal_module_1 = require("../withdrawal/withdrawal.module");
const user_model_1 = require("../user/user.model");
const user_repository_1 = require("../user/user.repository");
let WalletModule = class WalletModule {
};
WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            paystack_module_1.PaystackModule,
            withdrawal_module_1.WithdrawalModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Wallet', schema: wallet_model_1.WalletSchema },
                { name: 'User', schema: user_model_1.UserSchema },
            ]),
        ],
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService, wallet_repository_1.WalletRepository, user_repository_1.UserRepository],
        exports: [wallet_service_1.WalletService, wallet_repository_1.WalletRepository],
    })
], WalletModule);
exports.WalletModule = WalletModule;
//# sourceMappingURL=wallet.module.js.map