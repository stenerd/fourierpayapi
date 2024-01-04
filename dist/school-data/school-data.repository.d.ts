import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolDataDocument } from './school-data.model';
export declare class SchoolDataRepository extends CoreRepository<SchoolDataDocument> {
    constructor(schoolDataModel: Model<SchoolDataDocument>);
}
