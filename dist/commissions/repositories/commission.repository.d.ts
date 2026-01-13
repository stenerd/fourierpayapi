import { Model } from 'mongoose';
import { CommissionDocument } from '../models/commission.model';
import { CoreRepository } from 'src/common/core/repository.core';
export declare class CommissionRepository extends CoreRepository<CommissionDocument> {
    constructor(commissionModel: Model<CommissionDocument>);
    count(query: any): Promise<number>;
    findById(id: string): Promise<CommissionDocument | null>;
    updateOne(id: string, update: any): Promise<CommissionDocument | null>;
}
