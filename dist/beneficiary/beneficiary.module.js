"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryModule = void 0;
const common_1 = require("@nestjs/common");
const beneficiary_service_1 = require("./beneficiary.service");
const beneficiary_controller_1 = require("./beneficiary.controller");
const user_module_1 = require("../user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const beneficiary_model_1 = require("./beneficiary.model");
const beneficiary_repository_1 = require("./beneficiary.repository");
const paystack_module_1 = require("../paystack/paystack.module");
let BeneficiaryModule = class BeneficiaryModule {
};
BeneficiaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            paystack_module_1.PaystackModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Beneficiary', schema: beneficiary_model_1.BeneficiarySchema },
            ]),
        ],
        controllers: [beneficiary_controller_1.BeneficiaryController],
        providers: [beneficiary_service_1.BeneficiaryService, beneficiary_repository_1.BeneficiaryRepository],
    })
], BeneficiaryModule);
exports.BeneficiaryModule = BeneficiaryModule;
//# sourceMappingURL=beneficiary.module.js.map