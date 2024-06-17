import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { InstitionMetadata, InstitutionMetadataDocument, InstitutionMetadataSchema } from '../model/metadata.model';

@Injectable()
export class InstitutionMetadataRepository extends CoreRepository<InstitutionMetadataDocument> {
  constructor(
    @InjectModel(InstitionMetadata.name)
    institutionModel: Model<InstitutionMetadataDocument>,
  ) {
    super(institutionModel);
  }
}