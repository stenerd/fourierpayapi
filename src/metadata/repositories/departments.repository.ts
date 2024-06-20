import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { Department, DepartmentDocument } from '../model/metadata.model';

@Injectable()
export class DepartmentRepository extends CoreRepository<DepartmentDocument> {
  constructor(
    @InjectModel(Department.name)
    departmentModel: Model<DepartmentDocument>,
  ) {
    super(departmentModel);
  }
}