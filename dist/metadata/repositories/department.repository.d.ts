import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { DepartmentMetadataDocument } from '../model/metadata.model';
export declare class DepartmentMetadataRepository extends CoreRepository<DepartmentMetadataDocument> {
    constructor(departmentModel: Model<DepartmentMetadataDocument>);
}
