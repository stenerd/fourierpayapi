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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const auth_guards_1 = require("../common/guards/auth.guards");
const user_enum_1 = require("../user/user.enum");
const dashboard_service_1 = require("./dashboard.service");
const chart_query_dto_1 = require("./dto/chart-query.dto");
let DashboardController = class DashboardController extends controller_core_1.CoreController {
    constructor(service) {
        super();
        this.service = service;
    }
    async getDashboardMatrix(currentUser, res) {
        const resp = await this.service.getDashboardMatrix(currentUser.role == user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async getDashboardTables(currentUser, res) {
        const resp = await this.service.getDashboardTables(currentUser.role == user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async getDashboardChart(currentUser, data, res) {
        const resp = await this.service.getChartData(data.type, data.year, data.param, currentUser.role == user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async getProfileTables(currentUser, res) {
        const resp = await this.service.getProfileTables(currentUser.role == user_enum_1.RoleEnum.SUPERADMIN ? null : currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)('matrics'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardMatrix", null);
__decorate([
    (0, common_1.Get)('tables'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardTables", null);
__decorate([
    (0, common_1.Get)('chart'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chart_query_dto_1.ChartQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardChart", null);
__decorate([
    (0, common_1.Get)('profile/tables'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getProfileTables", null);
DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map