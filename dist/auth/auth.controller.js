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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const link_service_1 = require("../link/link.service");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const login_dto_1 = require("./dto/login.dto");
const user_enum_1 = require("../user/user.enum");
let AuthController = class AuthController extends controller_core_1.CoreController {
    constructor(authService, userService, linkService) {
        super();
        this.authService = authService;
        this.userService = userService;
        this.linkService = linkService;
    }
    async registration(createUserDto, res) {
        const user = await this.userService.create(Object.assign(Object.assign({}, createUserDto), { role: user_enum_1.RoleEnum.ADMIN, role_id: 'to be changed' }));
        await this.linkService.createDefaultLinks(user._id, 10);
        return this.responseSuccess(res, '00', 'Success', createUserDto, common_1.HttpStatus.CREATED);
    }
    async login(loginDto, res) {
        const resp = await this.authService.login(loginDto);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.CREATED);
    }
    async confirmEmail(token, res) {
        const user = await this.userService.confirmEmail(token);
        return this.responseSuccess(res, '00', 'Success', user, common_1.HttpStatus.OK);
    }
    async forgotPassword(dto, res) {
        const result = await this.authService.forgotPassword(dto.email);
        return this.responseSuccess(res, '00', 'Success', result, common_1.HttpStatus.OK);
    }
    async resetPassword(token, resetPasswordDto, res) {
        const user = await this.userService.resetPassword(token, Object.assign({}, resetPasswordDto));
        return this.responseSuccess(res, '00', 'Success', user, common_1.HttpStatus.OK);
    }
};
__decorate([
    (0, common_1.Post)('/registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/confirm-email/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ForgotPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_auth_dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        link_service_1.LinkService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map