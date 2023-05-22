"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./controllers/user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./user.model");
const user_repository_1 = require("./user.repository");
const user_factory_1 = require("./user.factory");
const bcrypt = require("bcrypt");
const wallet_module_1 = require("../wallet/wallet.module");
const email_service_1 = require("../email.service");
const subscription_module_1 = require("../subscription/subscription.module");
const user_subscription_controller_1 = require("./controllers/user-subscription.controller");
const subscription_service_1 = require("../subscription/services/subscription.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => wallet_module_1.WalletModule),
            subscription_module_1.SubscriptionModule,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: 'User',
                    useFactory: () => {
                        const schema = user_model_1.UserSchema;
                        schema.pre('save', async function () {
                            const user = this;
                            const salt = await bcrypt.genSalt(10);
                            const hashPassword = await bcrypt.hash(user.password, salt);
                            user.password = hashPassword;
                        });
                        return schema;
                    },
                },
            ]),
        ],
        controllers: [user_controller_1.UserController, user_subscription_controller_1.UserSubscriptionController],
        providers: [
            user_repository_1.UserRepository,
            user_service_1.UserService,
            user_factory_1.UserFactory,
            email_service_1.EmailService,
            subscription_service_1.SubscriptionService,
        ],
        exports: [user_service_1.UserService, user_repository_1.UserRepository, user_factory_1.UserFactory, subscription_service_1.SubscriptionService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map