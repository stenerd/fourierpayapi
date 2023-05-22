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
exports.SubscriptionSettingSchema = exports.SubscriptionSetting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const subscription_enum_1 = require("../subscription.enum");
let SubscriptionSetting = class SubscriptionSetting {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: subscription_enum_1.SubscriptionNameEnum,
        default: subscription_enum_1.SubscriptionNameEnum.BASIC,
    }),
    __metadata("design:type", String)
], SubscriptionSetting.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: subscription_enum_1.SubscriptionTagEnum,
        default: subscription_enum_1.SubscriptionTagEnum.BASIC,
    }),
    __metadata("design:type", String)
], SubscriptionSetting.prototype, "tag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0.0 }),
    __metadata("design:type", Number)
], SubscriptionSetting.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], SubscriptionSetting.prototype, "active", void 0);
SubscriptionSetting = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubscriptionSetting);
exports.SubscriptionSetting = SubscriptionSetting;
exports.SubscriptionSettingSchema = mongoose_1.SchemaFactory.createForClass(SubscriptionSetting);
//# sourceMappingURL=subscription-setting.model.js.map