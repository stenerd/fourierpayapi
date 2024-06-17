import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { LevelMetadataDocument } from '../model/metadata.model';
export declare class LevelMetadataRepository extends CoreRepository<LevelMetadataDocument> {
    constructor(levelModel: Model<LevelMetadataDocument>);
}
