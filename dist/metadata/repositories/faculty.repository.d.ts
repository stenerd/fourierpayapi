import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { FacultyDocument } from '../model/metadata.model';
export declare class FacultyRepository extends CoreRepository<FacultyDocument> {
    constructor(facultyModel: Model<FacultyDocument>);
}
