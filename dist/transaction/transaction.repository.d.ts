import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { TransactionDocument } from './transaction.model';
export declare class TransactionRepository extends CoreRepository<TransactionDocument> {
    constructor(transactionModel: Model<TransactionDocument>);
}
