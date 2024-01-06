import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolSessionDocument } from '../models/school-session.model';

@Injectable()
export class SchoolSessionRepository extends CoreRepository<SchoolSessionDocument> {
  constructor(
    @InjectModel('SchoolSession')
    SchoolSessionModel: Model<SchoolSessionDocument>,
  ) {
    super(SchoolSessionModel);
  }
}
