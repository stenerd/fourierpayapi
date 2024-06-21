import { OnModuleInit } from '@nestjs/common';
import { MetadataService } from 'src/metadata/metadata.service';
import { InstitutionRepository } from 'src/metadata/repositories/Institutions.repository';
import { DepartmentMetadataRepository } from 'src/metadata/repositories/department.repository';
import { DepartmentRepository } from 'src/metadata/repositories/departments.repository';
import { FacultyRepository } from 'src/metadata/repositories/faculty.repository';
import { FacultyMetadataRepository } from 'src/metadata/repositories/facultymetadata.repository';
import { InstitutionMetadataRepository } from 'src/metadata/repositories/institution.metadata';
import { LevelMetadataRepository } from 'src/metadata/repositories/level.repositories';
import { LevelsRepository } from 'src/metadata/repositories/levels.repository';
export declare class DatabaseService implements OnModuleInit {
    private readonly facultyMetadata;
    private readonly levelMetadata;
    private readonly departmentMetadata;
    private readonly institutionMetadata;
    private readonly metadata;
    private readonly facultyRepository;
    private readonly institutionRepo;
    private readonly levelRepo;
    private readonly departmentRepo;
    constructor(facultyMetadata: FacultyMetadataRepository, levelMetadata: LevelMetadataRepository, departmentMetadata: DepartmentMetadataRepository, institutionMetadata: InstitutionMetadataRepository, metadata: MetadataService, facultyRepository: FacultyRepository, institutionRepo: InstitutionRepository, levelRepo: LevelsRepository, departmentRepo: DepartmentRepository);
    onModuleInit(): void;
    slug(input: string): string;
    seedDb(): Promise<void>;
}
