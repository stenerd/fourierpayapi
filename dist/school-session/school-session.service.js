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
exports.SchoolSessionService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const school_session_repository_1 = require("./repositories/school-session.repository");
const school_session_setting_repository_1 = require("./repositories/school-session-setting.repository");
const school_session_factory_1 = require("./factories/school-session.factory");
const school_term_repository_1 = require("./repositories/school-term.repository");
const school_term_factory_1 = require("./factories/school-term.factory");
const school_session_setting_factory_1 = require("./factories/school-session-setting.factory");
let SchoolSessionService = class SchoolSessionService extends service_core_1.CoreService {
    constructor(repository, schoolSessionSettingRepository, schoolTermRepository, factory, schoolTermFactory, schoolSessionSettingFactory) {
        super(repository);
        this.repository = repository;
        this.schoolSessionSettingRepository = schoolSessionSettingRepository;
        this.schoolTermRepository = schoolTermRepository;
        this.factory = factory;
        this.schoolTermFactory = schoolTermFactory;
        this.schoolSessionSettingFactory = schoolSessionSettingFactory;
    }
    async createSchoolSession(payload) {
        const school_session_setting = await this.schoolSessionSettingRepository.findOne({
            _id: payload.session_setting_id,
        });
        if (!school_session_setting)
            throw new common_1.BadRequestException('Session does not exist.');
        const existing_school_session = await this.repository.findOne({
            school_id: payload.school_id,
            session_setting_id: payload.session_setting_id,
        }, {}, {
            populate: ['session_setting_id'],
        });
        if (existing_school_session)
            throw new common_1.BadRequestException('You have already created this session');
        const new_school_session = this.factory.createNew(payload);
        const school_session = await this.repository.create(new_school_session);
        const new_school_term = this.schoolTermFactory.createNew({
            school_id: payload.school_id,
            session_id: school_session._id,
            session_setting_id: payload.session_setting_id,
            number_of_term: 3,
        });
        const school_term = await this.schoolTermRepository.createMany(new_school_term);
        return { school_session, school_term };
    }
    async onboardingSchoolSession(school_id) {
        const { start_year, end_year } = this.schoolTermFactory.getStartAndEndYear();
        const get_session_setting = await this.schoolSessionSettingRepository.findOne({
            start_year,
            end_year,
        });
        if (!get_session_setting) {
            const new_school_session_setting = this.schoolSessionSettingFactory.generateNew({ start_year, end_year });
            const create_session_setting = await this.schoolSessionSettingRepository.create(new_school_session_setting);
            return this.createSchoolSession({
                school_id,
                session_setting_id: create_session_setting._id,
            });
        }
        return this.createSchoolSession({
            school_id,
            session_setting_id: get_session_setting._id,
        });
    }
};
SchoolSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [school_session_repository_1.SchoolSessionRepository,
        school_session_setting_repository_1.SchoolSessionSettingRepository,
        school_term_repository_1.SchoolTermRepository,
        school_session_factory_1.SchoolSessionFactory,
        school_term_factory_1.SchoolTermFactory,
        school_session_setting_factory_1.SchoolSessionSettingFactory])
], SchoolSessionService);
exports.SchoolSessionService = SchoolSessionService;
//# sourceMappingURL=school-session.service.js.map