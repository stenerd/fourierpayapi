import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { UserDocument } from './user.model';
export declare class UserRepository extends CoreRepository<UserDocument> {
    constructor(userModel: Model<UserDocument>);
}
