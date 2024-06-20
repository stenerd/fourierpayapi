import { IMetadata, Roles } from './metadata.interface';
import { FacultyMetadataRepository } from './repositories/facultymetadata.repository';
import { InstitutionMetadataRepository } from './repositories/institution.metadata';
import { LevelMetadataRepository } from './repositories/level.repositories';
import { DepartmentMetadataRepository } from './repositories/department.repository';
export declare class MetadataService implements IMetadata {
    private readonly facultyRepository;
    private readonly institutionRepository;
    private readonly levelRepository;
    private readonly departmentRepository;
    constructor(facultyRepository: FacultyMetadataRepository, institutionRepository: InstitutionMetadataRepository, levelRepository: LevelMetadataRepository, departmentRepository: DepartmentMetadataRepository);
    repositoryMap: {
        department: DepartmentMetadataRepository;
        institution: InstitutionMetadataRepository;
        faculty: FacultyMetadataRepository;
        level: LevelMetadataRepository;
    };
    createMetadata(name: Roles, data: Record<string, any>): Promise<void>;
    deleteMetadata(name: string, data: any): Promise<void>;
    findMetadata(name: string, data: Record<string, any>): Promise<void>;
    editMetadata(name: string, data: Record<string, any>): Promise<void>;
}
