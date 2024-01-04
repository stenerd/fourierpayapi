"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolOnboardingService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const school_data_service_1 = require("../../school-data/school-data.service");
const onboarding_factory_1 = require("../factories/onboarding.factory");
let SchoolOnboardingService = class SchoolOnboardingService {
    constructor(userService, schoolDataService, factory) {
        this.userService = userService;
        this.schoolDataService = schoolDataService;
        this.factory = factory;
    }
    async createAccount(data) {
        if (await this.userService.findOne({ email: data.school_email }))
            throw new common_1.ConflictException('A user with this email already exist');
        const school = await this.schoolDataService.create(data);
        const user = await this.userService.create(this.factory.createNewUser(data, school._id));
        return {
            user,
            school,
        };
    }
};
SchoolOnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        school_data_service_1.SchoolDataService,
        onboarding_factory_1.SchoolOnboardingFactory])
], SchoolOnboardingService);
exports.SchoolOnboardingService = SchoolOnboardingService;
//# sourceMappingURL=onboarding.service.js.map