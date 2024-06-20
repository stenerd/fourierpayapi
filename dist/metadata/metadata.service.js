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
exports.MetadataService = void 0;
const common_1 = require("@nestjs/common");
const metadata_interface_1 = require("./metadata.interface");
const facultymetadata_repository_1 = require("./repositories/facultymetadata.repository");
const institution_metadata_1 = require("./repositories/institution.metadata");
const level_repositories_1 = require("./repositories/level.repositories");
const department_repository_1 = require("./repositories/department.repository");
let MetadataService = class MetadataService {
    constructor(facultyRepository, institutionRepository, levelRepository, departmentRepository) {
        this.facultyRepository = facultyRepository;
        this.institutionRepository = institutionRepository;
        this.levelRepository = levelRepository;
        this.departmentRepository = departmentRepository;
        this.repositoryMap = {
            [metadata_interface_1.Roles.DEPARTMENT]: this.departmentRepository,
            [metadata_interface_1.Roles.INSTITUTION]: this.institutionRepository,
            [metadata_interface_1.Roles.FACULTY]: this.facultyRepository,
            [metadata_interface_1.Roles.LEVEL]: this.levelRepository,
        };
    }
    async createMetadata(name, data) {
        let repository = this.repositoryMap[name];
        await repository.create(data);
    }
    async deleteMetadata(name, data) {
        let repository = this.repositoryMap[name];
        await repository.delete(data);
    }
    async findMetadata(name, data) {
        let repository = this.repositoryMap[name];
        await repository.find(data);
    }
    async editMetadata(name, data) {
        let repository = this.repositoryMap[name];
        await repository.findOneAndUpdate({ _id: data.id }, { data }, {});
    }
};
MetadataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [facultymetadata_repository_1.FacultyMetadataRepository,
        institution_metadata_1.InstitutionMetadataRepository,
        level_repositories_1.LevelMetadataRepository,
        department_repository_1.DepartmentMetadataRepository])
], MetadataService);
exports.MetadataService = MetadataService;
//# sourceMappingURL=metadata.service.js.map