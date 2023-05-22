"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const withdrawal_controller_1 = require("./withdrawal.controller");
const withdrawal_model_1 = require("./withdrawal.model");
const withdrawal_repository_1 = require("./withdrawal.repository");
const withdrawal_service_1 = require("./withdrawal.service");
let WithdrawalModule = class WithdrawalModule {
};
WithdrawalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Withdrawal', schema: withdrawal_model_1.WithdrawalSchema },
            ]),
        ],
        controllers: [withdrawal_controller_1.WithdrawalController],
        providers: [withdrawal_repository_1.WithdrawalRepository, withdrawal_service_1.WithdrawalService],
        exports: [withdrawal_repository_1.WithdrawalRepository, withdrawal_service_1.WithdrawalService],
    })
], WithdrawalModule);
exports.WithdrawalModule = WithdrawalModule;
//# sourceMappingURL=withdrawal.module.js.map