import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { FacultyMetadata, FacultyMetadataDocument, LevelMetadata, LevelMetadataDocument } from '../model/metadata.model';

@Injectable()
export class LevelMetadataRepository extends CoreRepository<LevelMetadataDocument> {
  constructor(
    @InjectModel(LevelMetadata.name)
    levelModel: Model<LevelMetadataDocument>,
  ) {
    super(levelModel);
  }
}