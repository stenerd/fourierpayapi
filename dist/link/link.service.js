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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const link_factory_1 = require("./link.factory");
const link_repository_1 = require("./link.repository");
let LinkService = class LinkService extends service_core_1.CoreService {
    constructor(repository, factory) {
        super(repository);
        this.repository = repository;
        this.factory = factory;
    }
    async createDefaultLinks(user_id, length) {
        const payload = this.factory.createDefault(length, user_id);
        await this.repository.createMany(payload);
    }
};
LinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [link_repository_1.LinkRepository,
        link_factory_1.LinkFactory])
], LinkService);
exports.LinkService = LinkService;
//# sourceMappingURL=link.service.js.map