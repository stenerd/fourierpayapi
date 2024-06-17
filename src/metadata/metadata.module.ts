import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentMetadata, DepartmentMetadataSchema, FacultyMetadata, FacultyMetadataSchema, InstitionMetadata, InstitutionMetadataSchema, LevelMetadata, LevelMetadataSchema } from './model/metadata.model';
import { InstitutionMetadataRepository } from './repositories/institution.metadata';
import { FacultyMetadataRepository } from './repositories/facultymetadata.repository';
import { LevelMetadataRepository } from './repositories/level.repositories';
import { DepartmentMetadataRepository } from './repositories/department.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: FacultyMetadata.name, schema: FacultyMetadataSchema },
    { name: InstitionMetadata.name, schema: InstitutionMetadataSchema },
    { name: DepartmentMetadata.name, schema: DepartmentMetadataSchema },
    { name: LevelMetadata.name, schema: LevelMetadataSchema }
  ])
  ],
  controllers: [MetadataController],
  providers: [MetadataService, InstitutionMetadataRepository, FacultyMetadataRepository, LevelMetadataRepository, DepartmentMetadataRepository],
  exports: [InstitutionMetadataRepository, FacultyMetadataRepository, LevelMetadataRepository, DepartmentMetadataRepository]
})
export class MetadataModule { }
