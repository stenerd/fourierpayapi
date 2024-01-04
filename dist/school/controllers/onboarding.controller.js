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
exports.SchoolOnboadingController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../../common/core/controller.core");
const link_service_1 = require("../../link/link.service");
const onboarding_dto_1 = require("../dtos/onboarding.dto");
const onboarding_service_1 = require("../services/onboarding.service");
let SchoolOnboadingController = class SchoolOnboadingController extends controller_core_1.CoreController {
    constructor(service, linkService) {
        super();
        this.service = service;
        this.linkService = linkService;
    }
    async registration(schoolOnboardingDto, res) {
        const data = await this.service.createAccount(schoolOnboardingDto);
        await this.linkService.createDefaultLinks(data.user._id, 10);
        return this.responseSuccess(res, '00', 'Success', schoolOnboardingDto, common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Post)('/onboarding'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [onboarding_dto_1.SchoolOnboardingDto, Object]),
    __metadata("design:returntype", Promise)
], SchoolOnboadingController.prototype, "registration", null);
SchoolOnboadingController = __decorate([
    (0, common_1.Controller)('schools'),
    __metadata("design:paramtypes", [onboarding_service_1.SchoolOnboardingService,
        link_service_1.LinkService])
], SchoolOnboadingController);
exports.SchoolOnboadingController = SchoolOnboadingController;
//# sourceMappingURL=onboarding.controller.js.map