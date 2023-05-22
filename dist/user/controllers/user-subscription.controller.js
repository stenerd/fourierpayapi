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
exports.UserSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../../common/core/controller.core");
const auth_guards_1 = require("../../common/guards/auth.guards");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const subscription_service_1 = require("../../subscription/services/subscription.service");
const create_subscription_setting_dto_1 = require("../../subscription/dto/create-subscription-setting.dto");
let UserSubscriptionController = class UserSubscriptionController extends controller_core_1.CoreController {
    constructor(service) {
        super();
        this.service = service;
    }
    async fetchSubscriptions(currentUser, query, res) {
        const subscriptions = await this.service.fetchSubscriptions(currentUser._id, query.status || null);
        return this.responseSuccess(res, '00', 'Success', subscriptions, common_1.HttpStatus.OK);
    }
    async subscribe(currentUser, dto, res) {
        await this.service.subscribe(currentUser._id, dto);
        return this.responseSuccess(res, '00', 'Success', dto, common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_subscription_setting_dto_1.FetchSubscriptionSettingFilterDto, Object]),
    __metadata("design:returntype", Promise)
], UserSubscriptionController.prototype, "fetchSubscriptions", null);
__decorate([
    (0, common_1.Post)('/subscribe'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_subscription_setting_dto_1.SubscribeDto, Object]),
    __metadata("design:returntype", Promise)
], UserSubscriptionController.prototype, "subscribe", null);
UserSubscriptionController = __decorate([
    (0, common_1.Controller)('user/subscription'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], UserSubscriptionController);
exports.UserSubscriptionController = UserSubscriptionController;
//# sourceMappingURL=user-subscription.controller.js.map