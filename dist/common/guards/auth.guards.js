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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const subscription_service_1 = require("../../subscription/services/subscription.service");
const user_service_1 = require("../../user/user.service");
const core_1 = require("@nestjs/core");
let AuthGuard = class AuthGuard {
    constructor(userService, subscriptionService, reflector) {
        this.userService = userService;
        this.subscriptionService = subscriptionService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const getSubscription = this.reflector.get('getSubscription', context.getHandler());
        const valid = await this.validateRequest(request, getSubscription && getSubscription.toLowerCase() == 'get');
        if (!valid)
            throw new common_1.UnauthorizedException('Unauthorized access');
        return true;
    }
    async validateRequest(request, withSubscription = false) {
        const authToken = this.getAuthTokenFromRequest(request);
        if (!authToken)
            return false;
        const authData = jwt.decode(authToken, { complete: true });
        if (!authData || !authData.payload)
            return false;
        const userExist = await this.userService.findOne({
            _id: authData.payload._id,
        });
        if (!userExist) {
            throw new common_1.UnauthorizedException('Unauthorized access');
        }
        request.user = userExist;
        request.subscription = null;
        if (withSubscription) {
            const subscriptionExist = await this.subscriptionService.findOne({
                useer_id: authData.payload._id,
                is_active: true,
            }, {}, {
                populate: ['subscription_setting_id'],
            });
            request.subscription = subscriptionExist || null;
        }
        return true;
    }
    getAuthTokenFromRequest(request) {
        const authTokenSegment = (request.headers['authorization'] || '').split(' ');
        return authTokenSegment.length == 2 ? authTokenSegment[1] : null;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        subscription_service_1.SubscriptionService,
        core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guards.js.map