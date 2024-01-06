import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolSessionDocument } from '../models/school-session.model';
export declare class SchoolSessionRepository extends CoreRepository<SchoolSessionDocument> {
    constructor(SchoolSessionModel: Model<SchoolSessionDocument>);
}
