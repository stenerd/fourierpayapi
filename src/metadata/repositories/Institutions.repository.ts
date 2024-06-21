import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { Institution, InstitutionDocument } from '../model/metadata.model';

@Injectable()
export class InstitutionRepository extends CoreRepository<InstitutionDocument> {
  constructor(
    @InjectModel(Institution.name)
    institutionModel: Model<InstitutionDocument>,
  ) {
    super(institutionModel);
  }
}
