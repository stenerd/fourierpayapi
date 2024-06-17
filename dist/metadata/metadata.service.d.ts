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
    createMetadata(name: Roles, data: Record<string, {}>): Promise<void>;
    deleteMetadata(name: string, data: any): Promise<void>;
    findMetadata(name: string, data: Record<string, {}>): Promise<void>;
}
