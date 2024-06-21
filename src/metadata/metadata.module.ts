import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentMetadata, DepartmentMetadataSchema, DepartmentSchema, Faculty, FacultyMetadata, FacultyMetadataSchema, FacultySchema, InstitionMetadata, Institution, InstitutionMetadataSchema, InstitutionSchema, Level, LevelMetadata, LevelMetadataSchema, LevelSchema } from './model/metadata.model';
import { InstitutionMetadataRepository } from './repositories/institution.metadata';
import { FacultyMetadataRepository } from './repositories/facultymetadata.repository';
import { LevelMetadataRepository } from './repositories/level.repositories';
import { DepartmentMetadataRepository } from './repositories/department.repository';
import { DepartmentRepository } from './repositories/departments.repository';
import { InstitutionRepository } from './repositories/Institutions.repository';
import { LevelsRepository } from './repositories/levels.repository';
import { FacultyRepository } from './repositories/faculty.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: FacultyMetadata.name, schema: FacultyMetadataSchema },
    { name: InstitionMetadata.name, schema: InstitutionMetadataSchema },
    { name: DepartmentMetadata.name, schema: DepartmentMetadataSchema },
    { name: LevelMetadata.name, schema: LevelMetadataSchema },
    { name: Faculty.name, schema: FacultySchema },
    { name: Level.name, schema: LevelSchema },
    { name:  Department.name, schema:  DepartmentSchema },
    { name: Institution.name, schema: InstitutionSchema }
  ])
  ],
  controllers: [MetadataController],
  providers: [MetadataService, InstitutionMetadataRepository, FacultyMetadataRepository, LevelMetadataRepository, DepartmentMetadataRepository,DepartmentRepository,InstitutionRepository,LevelsRepository,FacultyRepository],
  exports: [InstitutionMetadataRepository, FacultyMetadataRepository, LevelMetadataRepository, DepartmentMetadataRepository,MetadataService,DepartmentMetadataRepository,DepartmentRepository,InstitutionRepository,LevelsRepository,FacultyRepository]
})
export class MetadataModule {}
