import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { LevelDocument } from '../model/metadata.model';
export declare class LevelsRepository extends CoreRepository<LevelDocument> {
    constructor(levelModel: Model<LevelDocument>);
}
