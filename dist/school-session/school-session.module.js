"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSessionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const school_session_setting_model_1 = require("./models/school-session-setting.model");
const school_session_model_1 = require("./models/school-session.model");
const school_session_setting_repository_1 = require("./repositories/school-session-setting.repository");
const school_session_repository_1 = require("./repositories/school-session.repository");
const school_session_factory_1 = require("./factories/school-session.factory");
const school_session_setting_factory_1 = require("./factories/school-session-setting.factory");
const school_session_service_1 = require("./school-session.service");
const school_term_repository_1 = require("./repositories/school-term.repository");
const school_term_factory_1 = require("./factories/school-term.factory");
const school_term_model_1 = require("./models/school-term.model");
let SchoolSessionModule = class SchoolSessionModule {
};
SchoolSessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'SchoolSessionSetting', schema: school_session_setting_model_1.SchoolSessionSettingSchema },
                { name: 'SchoolSession', schema: school_session_model_1.SchoolSessionSchema },
                { name: 'SchoolTerm', schema: school_term_model_1.SchoolTermSchema },
            ]),
        ],
        controllers: [],
        providers: [
            school_session_setting_repository_1.SchoolSessionSettingRepository,
            school_session_repository_1.SchoolSessionRepository,
            school_term_repository_1.SchoolTermRepository,
            school_session_factory_1.SchoolSessionFactory,
            school_session_setting_factory_1.SchoolSessionSettingFactory,
            school_term_factory_1.SchoolTermFactory,
            school_session_service_1.SchoolSessionService,
        ],
        exports: [school_session_service_1.SchoolSessionService],
    })
], SchoolSessionModule);
exports.SchoolSessionModule = SchoolSessionModule;
//# sourceMappingURL=school-session.module.js.map