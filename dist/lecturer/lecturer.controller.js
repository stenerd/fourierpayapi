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
exports.LecturerController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const lecturer_service_1 = require("./lecturer.service");
const lecturer_dto_1 = require("./lecturer.dto");
let LecturerController = class LecturerController extends controller_core_1.CoreController {
    constructor(lecturerService) {
        super();
        this.lecturerService = lecturerService;
    }
    async onboardLecturer(lecturer, res) {
        const data = await this.lecturerService.createLecturer(lecturer);
        return this.responseSuccess(res, "00", "Success", data, common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Post)("/onboard"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecturer_dto_1.CreateLecturerDto, Object]),
    __metadata("design:returntype", Promise)
], LecturerController.prototype, "onboardLecturer", null);
LecturerController = __decorate([
    (0, common_1.Controller)('lecturer'),
    __metadata("design:paramtypes", [lecturer_service_1.LecturerService])
], LecturerController);
exports.LecturerController = LecturerController;
//# sourceMappingURL=lecturer.controller.js.map