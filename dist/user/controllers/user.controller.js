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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const controller_core_1 = require("../../common/core/controller.core");
const auth_guards_1 = require("../../common/guards/auth.guards");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const current_subscription_decorator_1 = require("../../common/decorators/current-subscription.decorator");
const subscription_model_1 = require("../../subscription/models/subscription.model");
const get_subscription_metadata_decorator_1 = require("../../common/decorators/get-subscription-metadata.decorator");
let UserController = class UserController extends controller_core_1.CoreController {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    async createSuperAcount(dto, res) {
        await this.userService.createSuperAcount(dto);
        return this.responseSuccess(res, '00', 'Success', dto, common_1.HttpStatus.CREATED);
    }
    async updateUser(dto, currentUser, res) {
        await this.userService.updateUser(dto, currentUser._id);
        return this.responseSuccess(res, '00', 'Success', dto, common_1.HttpStatus.ACCEPTED);
    }
    async profile(currentUser, currentSubscription, res) {
        console.log('currentSubscription >> ', currentSubscription);
        const user = await this.userService.profile(currentUser._id);
        return this.responseSuccess(res, '00', 'Success', user, common_1.HttpStatus.ACCEPTED);
    }
};
__decorate([
    (0, common_1.Post)('/create-super-admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createSuperAcount", null);
__decorate([
    (0, common_1.Put)('/edit'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, get_subscription_metadata_decorator_1.GetSubscriptionData)('Get'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, current_subscription_decorator_1.CurrentSubscription)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subscription_model_1.Subscription, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profile", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map