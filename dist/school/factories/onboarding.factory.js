"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolOnboardingFactory = void 0;
const common_1 = require("@nestjs/common");
const user_enum_1 = require("../../user/user.enum");
let SchoolOnboardingFactory = class SchoolOnboardingFactory {
    createNewUser(data, role_id) {
        const name_arr = data.school_admin_name.split(' ');
        const user_data = {
            firstname: name_arr.slice(0, name_arr.length - 1).join(' '),
            lastname: name_arr[name_arr.length - 1],
            email: data.school_email,
            phonenumber: data.school_mobile_number,
            password: data.password,
            role: user_enum_1.RoleEnum.SCHOOL,
            role_id,
        };
        return user_data;
    }
};
SchoolOnboardingFactory = __decorate([
    (0, common_1.Injectable)()
], SchoolOnboardingFactory);
exports.SchoolOnboardingFactory = SchoolOnboardingFactory;
//# sourceMappingURL=onboarding.factory.js.map