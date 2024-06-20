import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import {  Level, LevelDocument } from '../model/metadata.model';

@Injectable()
export class LevelsRepository extends CoreRepository<LevelDocument> {
  constructor(
    @InjectModel(Level.name)
    levelModel: Model<LevelDocument>,
  ) {
    super(levelModel);
  }
}