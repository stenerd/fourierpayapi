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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const metadata_interface_1 = require("../metadata/metadata.interface");
const metadata_service_1 = require("../metadata/metadata.service");
const Institutions_repository_1 = require("../metadata/repositories/Institutions.repository");
const department_repository_1 = require("../metadata/repositories/department.repository");
const departments_repository_1 = require("../metadata/repositories/departments.repository");
const faculty_repository_1 = require("../metadata/repositories/faculty.repository");
const facultymetadata_repository_1 = require("../metadata/repositories/facultymetadata.repository");
const institution_metadata_1 = require("../metadata/repositories/institution.metadata");
const level_repositories_1 = require("../metadata/repositories/level.repositories");
const levels_repository_1 = require("../metadata/repositories/levels.repository");
let DatabaseService = class DatabaseService {
    constructor(facultyMetadata, levelMetadata, departmentMetadata, institutionMetadata, metadata, facultyRepository, institutionRepo, levelRepo, departmentRepo) {
        this.facultyMetadata = facultyMetadata;
        this.levelMetadata = levelMetadata;
        this.departmentMetadata = departmentMetadata;
        this.institutionMetadata = institutionMetadata;
        this.metadata = metadata;
        this.facultyRepository = facultyRepository;
        this.institutionRepo = institutionRepo;
        this.levelRepo = levelRepo;
        this.departmentRepo = departmentRepo;
    }
    onModuleInit() {
        this.seedDb();
    }
    slug(input) {
        return input.replace(/\s+/g, '-').toLowerCase();
    }
    async seedDb() {
        const university = ['Universiy of Benin'];
        const faculty = ['ENGINEERING', 'PHYSICAL SCIENCE', 'LAW'];
        const department = ['MECHANICAL ENGINEERING'];
        const institution = await this.institutionMetadata.findOne({
            name: university[0],
        });
        console.log(institution);
        if (!institution) {
            const createInstitution = await this.metadata.createMetadata(metadata_interface_1.Roles.INSTITUTION, { name: university[0], slug: this.slug(university[0]) });
            console.log(createInstitution);
            const findInstitution = await this.institutionMetadata.findOne({
                name: university[0],
            });
            await this.institutionRepo.create({
                institution_id: findInstitution._id,
            });
            const institute = await this.institutionRepo.findOne({
                name: university[0],
            });
            const findFaculty = await this.facultyMetadata.findOne({
                name: faculty[0],
            });
            if (!findFaculty) {
                const newFacultyMetadata = await this.metadata.createMetadata(metadata_interface_1.Roles.FACULTY, { name: faculty[0], slug: this.slug(faculty[0]) });
                const findFaculty = await this.facultyMetadata.findOne({
                    name: faculty[0],
                });
                const createFaculty = await this.facultyRepository.create({
                    institution_id: institute._id,
                    faculty_id: findFaculty._id,
                });
                const departmentMeta = await this.departmentMetadata.findOne({
                    name: department[0],
                });
                if (!departmentMeta) {
                    const newDepartment = await this.metadata.createMetadata(metadata_interface_1.Roles.DEPARTMENT, { name: department[0], slug: this.slug(department[0]) });
                    const departmentMeta = await this.departmentMetadata.findOne({
                        name: department[0],
                    });
                    const newDepart = await this.departmentRepo.create({
                        institution_id: institute._id,
                        department_id: departmentMeta._id,
                    });
                }
            }
            console.log('seed completed');
        }
        return;
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [facultymetadata_repository_1.FacultyMetadataRepository,
        level_repositories_1.LevelMetadataRepository,
        department_repository_1.DepartmentMetadataRepository,
        institution_metadata_1.InstitutionMetadataRepository,
        metadata_service_1.MetadataService,
        faculty_repository_1.FacultyRepository,
        Institutions_repository_1.InstitutionRepository,
        levels_repository_1.LevelsRepository,
        departments_repository_1.DepartmentRepository])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map