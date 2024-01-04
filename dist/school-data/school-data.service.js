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
exports.SchoolDataService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const school_data_repository_1 = require("./school-data.repository");
const school_data_factory_1 = require("./school-data.factory");
let SchoolDataService = class SchoolDataService extends service_core_1.CoreService {
    constructor(repository, factory) {
        super(repository);
        this.repository = repository;
        this.factory = factory;
    }
    async create(data) {
        if (await this.repository.findOne({
            $or: [
                { school_email: data.school_email },
                { school_name: data.school_name },
            ],
        }))
            throw new common_1.ConflictException('A school with this information already exists');
        const school_data_attribute = this.factory.createNew(data);
        const school_data = await this.repository.create(school_data_attribute);
        return school_data;
    }
};
SchoolDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [school_data_repository_1.SchoolDataRepository,
        school_data_factory_1.SchoolDataFactory])
], SchoolDataService);
exports.SchoolDataService = SchoolDataService;
//# sourceMappingURL=school-data.service.js.map