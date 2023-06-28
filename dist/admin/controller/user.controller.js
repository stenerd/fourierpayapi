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
exports.AdminUserController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../../common/core/controller.core");
const user_service_1 = require("../service/user.service");
const user_dto_1 = require("../dtos/user.dto");
const dto_core_1 = require("../../common/core/dto.core");
let AdminUserController = class AdminUserController extends controller_core_1.CoreController {
    constructor(adminUserService) {
        super();
        this.adminUserService = adminUserService;
    }
    async allUsers(query, res) {
        const resp = await this.adminUserService.allUsers(query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async allCountUsers(res) {
        const resp = await this.adminUserService.allCountUsers();
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async countUsers(res, query) {
        const resp = await this.adminUserService.countUsers(query);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AllUserDto, Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "allUsers", null);
__decorate([
    (0, common_1.Get)('all-count'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "allCountUsers", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_core_1.CoreSearchFilterDatePaginationDto]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "countUsers", null);
AdminUserController = __decorate([
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [user_service_1.AdminUserService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=user.controller.js.map