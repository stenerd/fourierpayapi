import { Injectable, OnModuleInit } from '@nestjs/common';
import { Roles } from 'src/metadata/metadata.interface';
import { MetadataService } from 'src/metadata/metadata.service';
import { InstitutionRepository } from 'src/metadata/repositories/Institutions.repository';
import { DepartmentMetadataRepository } from 'src/metadata/repositories/department.repository';
import { DepartmentRepository } from 'src/metadata/repositories/departments.repository';
import { FacultyRepository } from 'src/metadata/repositories/faculty.repository';
import { FacultyMetadataRepository } from 'src/metadata/repositories/facultymetadata.repository';
import { InstitutionMetadataRepository } from 'src/metadata/repositories/institution.metadata';
import { LevelMetadataRepository } from 'src/metadata/repositories/level.repositories';
import { LevelsRepository } from 'src/metadata/repositories/levels.repository';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    private readonly facultyMetadata: FacultyMetadataRepository,
    private readonly levelMetadata: LevelMetadataRepository,
    private readonly departmentMetadata: DepartmentMetadataRepository,
    private readonly institutionMetadata: InstitutionMetadataRepository,
    private readonly metadata: MetadataService,
    private readonly facultyRepository: FacultyRepository,
    private readonly institutionRepo: InstitutionRepository,
    private readonly levelRepo: LevelsRepository,
    private readonly departmentRepo: DepartmentRepository,
  ) {}
  onModuleInit() {
    this.seedDb();
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
      const createInstitution = await this.metadata.createMetadata(
        Roles.INSTITUTION,
        { name: university[0], slug: university[0] },
      );
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
        const newFacultyMetadata = await this.metadata.createMetadata(
          Roles.FACULTY,
          { name: faculty[0], slug: faculty[0] },
        );
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
          const newDepartment = await this.metadata.createMetadata(
            Roles.DEPARTMENT,
            { name: department[0], slug: department[0] },
          );
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
}
