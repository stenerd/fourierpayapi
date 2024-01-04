import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolDataDocument } from './school-data.model';

@Injectable()
export class SchoolDataRepository extends CoreRepository<SchoolDataDocument> {
  constructor(
    @InjectModel('SchoolData')
    schoolDataModel: Model<SchoolDataDocument>,
  ) {
    super(schoolDataModel);
  }
}
