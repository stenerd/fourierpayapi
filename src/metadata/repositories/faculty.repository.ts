import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { Department, DepartmentDocument, Faculty, FacultyDocument } from '../model/metadata.model';

@Injectable()
export class FacultyRepository extends CoreRepository<FacultyDocument> {
  constructor(
    @InjectModel(Faculty.name)
    facultyModel: Model<FacultyDocument>,
  ) {
    super(facultyModel);
  }
}