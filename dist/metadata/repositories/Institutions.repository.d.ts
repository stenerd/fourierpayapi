import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { InstitutionDocument } from '../model/metadata.model';
export declare class InstitutionRepository extends CoreRepository<InstitutionDocument> {
    constructor(institutionModel: Model<InstitutionDocument>);
}
