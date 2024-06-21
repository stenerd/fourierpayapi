import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import {
  DepartmentMetadata,
  DepartmentMetadataDocument,
  FacultyMetadata,
  FacultyMetadataDocument,
} from '../model/metadata.model';

@Injectable()
export class DepartmentMetadataRepository extends CoreRepository<DepartmentMetadataDocument> {
  constructor(
    @InjectModel(DepartmentMetadata.name)
    departmentModel: Model<DepartmentMetadataDocument>,
  ) {
    super(departmentModel);
  }
}
