import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { WithdrawalDocument } from './withdrawal.model';
export declare class WithdrawalRepository extends CoreRepository<WithdrawalDocument> {
    constructor(withdrawalModel: Model<WithdrawalDocument>);
}
