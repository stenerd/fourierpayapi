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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionSettingController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../../common/core/controller.core");
const create_subscription_setting_dto_1 = require("../dto/create-subscription-setting.dto");
const subscription_setting_service_1 = require("../services/subscription-setting.service");
let SubscriptionSettingController = class SubscriptionSettingController extends controller_core_1.CoreController {
    constructor(service) {
        super();
        this.service = service;
    }
    async createSubscriptionSetting(dto, res) {
        await this.service.createSubscriptionSetting(dto);
        return this.responseSuccess(res, '00', 'Success', dto, common_1.HttpStatus.CREATED);
    }
    async fetchSubscriptionSetting(filterDto, res) {
        const resp = await this.service.fetchSubscriptionSetting(filterDto.status || null);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.CREATED);
    }
    async changeSubscriptionSettingState(id, dto, res) {
        const resp = await this.service.changeSubscriptionSettingState(id, dto);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_subscription_setting_dto_1.CreateSubscriptionSettingDto !== "undefined" && create_subscription_setting_dto_1.CreateSubscriptionSettingDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionSettingController.prototype, "createSubscriptionSetting", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_subscription_setting_dto_1.FetchSubscriptionSettingFilterDto !== "undefined" && create_subscription_setting_dto_1.FetchSubscriptionSettingFilterDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionSettingController.prototype, "fetchSubscriptionSetting", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_subscription_setting_dto_1.ChangeSubscriptionSettingStateDto !== "undefined" && create_subscription_setting_dto_1.ChangeSubscriptionSettingStateDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionSettingController.prototype, "changeSubscriptionSettingState", null);
SubscriptionSettingController = __decorate([
    (0, common_1.Controller)('subscription-setting'),
    __metadata("design:paramtypes", [typeof (_a = typeof subscription_setting_service_1.SubscriptionSettingService !== "undefined" && subscription_setting_service_1.SubscriptionSettingService) === "function" ? _a : Object])
], SubscriptionSettingController);
exports.SubscriptionSettingController = SubscriptionSettingController;
//# sourceMappingURL=school-class.controller.js.map