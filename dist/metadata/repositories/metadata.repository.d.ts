import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { FacultyMetadataDocument } from '../model/metadata.model';
export declare class FacultyMetadataRepository extends CoreRepository<FacultyMetadataDocument> {
    constructor(facultyModel: Model<FacultyMetadataDocument>);
}
