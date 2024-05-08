"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSessionSettingFactory = void 0;
const common_1 = require("@nestjs/common");
const school_session_setting_model_1 = require("../models/school-session-setting.model");
let SchoolSessionSettingFactory = class SchoolSessionSettingFactory {
    createNew(data) {
        const school_session_setting = new school_session_setting_model_1.SchoolSessionSetting();
        for (const [key, value] of Object.entries(data)) {
            school_session_setting[key] = value;
        }
        return school_session_setting;
    }
    generateNew(data) {
        const school_session_setting = new school_session_setting_model_1.SchoolSessionSetting();
        school_session_setting.start_year = `${data.start_year}`;
        school_session_setting.end_year = `${data.end_year}`;
        school_session_setting.name = `${data.start_year}/${data.end_year}`;
        school_session_setting.tag = `${data.start_year}_${data.end_year}`;
        return school_session_setting;
    }
};
SchoolSessionSettingFactory = __decorate([
    (0, common_1.Injectable)()
], SchoolSessionSettingFactory);
exports.SchoolSessionSettingFactory = SchoolSessionSettingFactory;
//# sourceMappingURL=school-class-setting.factory.js.map