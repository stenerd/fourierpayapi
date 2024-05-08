import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolTermDocument } from '../models/school-term.model';

@Injectable()
export class SchoolTermRepository extends CoreRepository<SchoolTermDocument> {
  constructor(
    @InjectModel('SchoolTerm')
    SchoolTermModel: Model<SchoolTermDocument>,
  ) {
    super(SchoolTermModel);
  }
}
