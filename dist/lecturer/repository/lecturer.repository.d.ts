import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { LecturerDocument } from '../model/lecturer.model';
export declare class LecturerRepository extends CoreRepository<LecturerDocument> {
    constructor(lecturerModel: Model<LecturerDocument>);
}
