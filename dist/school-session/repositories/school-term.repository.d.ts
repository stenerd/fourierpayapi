import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolTermDocument } from '../models/school-term.model';
export declare class SchoolTermRepository extends CoreRepository<SchoolTermDocument> {
    constructor(SchoolTermModel: Model<SchoolTermDocument>);
}
