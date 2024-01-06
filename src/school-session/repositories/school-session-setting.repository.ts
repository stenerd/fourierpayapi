import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolSessionSettingDocument } from '../models/school-session-setting.model';

@Injectable()
export class SchoolSessionSettingRepository extends CoreRepository<SchoolSessionSettingDocument> {
  constructor(
    @InjectModel('SchoolSessionSetting')
    SchoolSessionSettingModel: Model<SchoolSessionSettingDocument>,
  ) {
    super(SchoolSessionSettingModel);
  }
}
