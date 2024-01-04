"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const onboarding_controller_1 = require("./controllers/onboarding.controller");
const school_data_module_1 = require("../school-data/school-data.module");
const onboarding_factory_1 = require("./factories/onboarding.factory");
const onboarding_service_1 = require("./services/onboarding.service");
const link_module_1 = require("../link/link.module");
let SchoolModule = class SchoolModule {
};
SchoolModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, school_data_module_1.SchoolDataModule, link_module_1.LinkModule],
        controllers: [onboarding_controller_1.SchoolOnboadingController],
        providers: [onboarding_factory_1.SchoolOnboardingFactory, onboarding_service_1.SchoolOnboardingService],
    })
], SchoolModule);
exports.SchoolModule = SchoolModule;
//# sourceMappingURL=school.module.js.map