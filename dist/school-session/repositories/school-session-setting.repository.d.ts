import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { SchoolSessionSettingDocument } from '../models/school-session-setting.model';
export declare class SchoolSessionSettingRepository extends CoreRepository<SchoolSessionSettingDocument> {
    constructor(SchoolSessionSettingModel: Model<SchoolSessionSettingDocument>);
}
