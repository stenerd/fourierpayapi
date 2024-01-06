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
exports.SchoolSessionSettingSchema = exports.SchoolSessionSetting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SchoolSessionSetting = class SchoolSessionSetting {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SchoolSessionSetting.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SchoolSessionSetting.prototype, "tag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SchoolSessionSetting.prototype, "start_year", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SchoolSessionSetting.prototype, "end_year", void 0);
SchoolSessionSetting = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SchoolSessionSetting);
exports.SchoolSessionSetting = SchoolSessionSetting;
exports.SchoolSessionSettingSchema = mongoose_1.SchemaFactory.createForClass(SchoolSessionSetting);
//# sourceMappingURL=school-session-setting.model.js.map