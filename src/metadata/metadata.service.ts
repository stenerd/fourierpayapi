import { ConflictException, Injectable } from '@nestjs/common';
import { IMetadata, Roles } from './metadata.interface';
import { FacultyMetadataRepository } from './repositories/facultymetadata.repository';
import { InstitutionMetadataRepository } from './repositories/institution.metadata';
import { LevelMetadataRepository } from './repositories/level.repositories';
import { DepartmentMetadataRepository } from './repositories/department.repository';

@Injectable()
export class MetadataService implements IMetadata {
    constructor(
        private readonly facultyRepository: FacultyMetadataRepository,
        private readonly institutionRepository: InstitutionMetadataRepository,
        private readonly levelRepository: LevelMetadataRepository,
        private readonly departmentRepository: DepartmentMetadataRepository
    ) { }
    async createMetadata(name: Roles, data: Record<string, {}>) {
        switch (name) {
            case Roles.DEPARTMENT:
                await this.departmentRepository.create(data)
            case Roles.INSTITUTION:
                await this.institutionRepository.create(data)
            case Roles.FACULTY:
                await this.facultyRepository.create(data)
            case Roles.LEVEL:
                await this.levelRepository.create(data)
            default:
                throw new ConflictException()
        }
    }

    async deleteMetadata(name: string, data) {
        switch (name) {
            case Roles.DEPARTMENT:
                await this.departmentRepository.delete(data)
            case Roles.INSTITUTION:
                await this.institutionRepository.delete(data)
            case Roles.FACULTY:
                await this.facultyRepository.delete(data)
            case Roles.LEVEL:
                await this.levelRepository.delete(data)
            default:
                throw new ConflictException()
        }
    }

    async findMetadata(name: string, data: Record<string, {}>) {
        switch (name) {
            case Roles.DEPARTMENT:
                await this.departmentRepository.find(data)
            case Roles.INSTITUTION:
                await this.institutionRepository.find(data)
            case Roles.FACULTY:
                await this.facultyRepository.find(data)
            case Roles.LEVEL:
                await this.levelRepository.find(data)
            default:
                throw new ConflictException()
        }
    }


}
