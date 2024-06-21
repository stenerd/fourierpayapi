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

    repositoryMap = {
        [Roles.DEPARTMENT]: this.departmentRepository,
        [Roles.INSTITUTION]: this.institutionRepository,
        [Roles.FACULTY]: this.facultyRepository,
        [Roles.LEVEL]: this.levelRepository,
    };

    async createMetadata(name: Roles, data: Record<string, any>) {
        let repository = this.repositoryMap[name]
        await repository.create(data)
    }

    async deleteMetadata(name: string, data) {
        let repository = this.repositoryMap[name]
        await repository.delete(data)
    }

    async findMetadata(name: string, data: Record<string, any>) {
        let repository = this.repositoryMap[name]
        const found =  await repository.findOne(data)
        return found
    }
    async editMetadata(name: string, data: Record<string, any>) {
        let repository = this.repositoryMap[name]
        await repository.findOneAndUpdate({ _id: data.id }, { data }, {})
    }
}
