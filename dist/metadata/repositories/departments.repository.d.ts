import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { DepartmentDocument } from '../model/metadata.model';
export declare class DepartmentRepository extends CoreRepository<DepartmentDocument> {
    constructor(departmentModel: Model<DepartmentDocument>);
}
