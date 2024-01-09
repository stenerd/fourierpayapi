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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSessionController = void 0;
const common_1 = require("@nestjs/common");
const school_session_service_1 = require("./school-session.service");
const auth_guards_1 = require("../common/guards/auth.guards");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_enum_1 = require("../user/user.enum");
const school_data_repository_1 = require("../school-data/school-data.repository");
const user_repository_1 = require("../user/user.repository");
const school_session_dto_1 = require("./dtos/school-session.dto");
let SchoolSessionController = class SchoolSessionController {
    constructor(sessionService, schoolData, userRepo) {
        this.sessionService = sessionService;
        this.schoolData = schoolData;
        this.userRepo = userRepo;
    }
    async createSession(data, user) {
        try {
            if (user.role !== user_enum_1.RoleEnum.SCHOOL)
                throw new common_1.UnauthorizedException();
            const currentUser = await this.userRepo.findOne({ _id: user._id });
            const school = await this.schoolData.findOne({ _id: currentUser.role_id });
            return await this.sessionService.createSession({ school_id: school._id, data });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getSession(user) {
        try {
            if (user.role !== user_enum_1.RoleEnum.SCHOOL)
                throw new common_1.UnauthorizedException();
            const currentUser = await this.userRepo.findOne({ _id: user._id });
            const school = await this.schoolData.findOne({ _id: currentUser.role_id });
            return await this.sessionService.getSession(school._id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async editSession(data, user, setting_id) {
        try {
            if (user.role !== user_enum_1.RoleEnum.SCHOOL)
                throw new common_1.UnauthorizedException();
            return await this.sessionService.editSession(setting_id, data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_session_dto_1.CreateSchoolSessionSettingDto, Object]),
    __metadata("design:returntype", Promise)
], SchoolSessionController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolSessionController.prototype, "getSession", null);
__decorate([
    (0, common_1.Put)("/edit/:setting_id"),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)("setting_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_session_dto_1.UpdateSchoolSessionSettingDto, Object, String]),
    __metadata("design:returntype", Promise)
], SchoolSessionController.prototype, "editSession", null);
SchoolSessionController = __decorate([
    (0, common_1.Controller)("school-session"),
    __metadata("design:paramtypes", [school_session_service_1.SchoolSessionService,
        school_data_repository_1.SchoolDataRepository,
        user_repository_1.UserRepository])
], SchoolSessionController);
exports.SchoolSessionController = SchoolSessionController;
//# sourceMappingURL=school-session.controller.js.map