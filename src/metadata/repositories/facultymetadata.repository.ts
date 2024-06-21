import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import {
  FacultyMetadata,
  FacultyMetadataDocument,
} from '../model/metadata.model';

@Injectable()
export class FacultyMetadataRepository extends CoreRepository<FacultyMetadataDocument> {
  constructor(
    @InjectModel(FacultyMetadata.name)
    facultyModel: Model<FacultyMetadataDocument>,
  ) {
    super(facultyModel);
  }
}
