"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolDataFactory = void 0;
const common_1 = require("@nestjs/common");
let SchoolDataFactory = class SchoolDataFactory {
    createNew(data) {
        const school_data = {
            number_of_students: data.number_of_students,
            school_name: data.school_name,
            school_admin_name: data.school_admin_name,
            school_email: data.school_email,
            school_mobile_number: data.school_mobile_number,
            school_logo: data.school_logo,
            school_banner: data.school_banner,
        };
        return school_data;
    }
};
SchoolDataFactory = __decorate([
    (0, common_1.Injectable)()
], SchoolDataFactory);
exports.SchoolDataFactory = SchoolDataFactory;
//# sourceMappingURL=school-data.factory.js.map