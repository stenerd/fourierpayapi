"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataModule = void 0;
const common_1 = require("@nestjs/common");
const metadata_controller_1 = require("./metadata.controller");
const metadata_service_1 = require("./metadata.service");
const mongoose_1 = require("@nestjs/mongoose");
const metadata_model_1 = require("./model/metadata.model");
const institution_metadata_1 = require("./repositories/institution.metadata");
const facultymetadata_repository_1 = require("./repositories/facultymetadata.repository");
const level_repositories_1 = require("./repositories/level.repositories");
const department_repository_1 = require("./repositories/department.repository");
let MetadataModule = class MetadataModule {
};
MetadataModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: metadata_model_1.FacultyMetadata.name, schema: metadata_model_1.FacultyMetadataSchema },
                { name: metadata_model_1.InstitionMetadata.name, schema: metadata_model_1.InstitutionMetadataSchema },
                { name: metadata_model_1.DepartmentMetadata.name, schema: metadata_model_1.DepartmentMetadataSchema },
                { name: metadata_model_1.LevelMetadata.name, schema: metadata_model_1.LevelMetadataSchema }
            ])
        ],
        controllers: [metadata_controller_1.MetadataController],
        providers: [metadata_service_1.MetadataService, institution_metadata_1.InstitutionMetadataRepository, facultymetadata_repository_1.FacultyMetadataRepository, level_repositories_1.LevelMetadataRepository, department_repository_1.DepartmentMetadataRepository],
        exports: [institution_metadata_1.InstitutionMetadataRepository, facultymetadata_repository_1.FacultyMetadataRepository, level_repositories_1.LevelMetadataRepository, department_repository_1.DepartmentMetadataRepository]
    })
], MetadataModule);
exports.MetadataModule = MetadataModule;
//# sourceMappingURL=metadata.module.js.map