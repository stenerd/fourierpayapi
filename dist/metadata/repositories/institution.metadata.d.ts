import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { InstitutionMetadataDocument } from '../model/metadata.model';
export declare class InstitutionMetadataRepository extends CoreRepository<InstitutionMetadataDocument> {
    constructor(institutionModel: Model<InstitutionMetadataDocument>);
}
