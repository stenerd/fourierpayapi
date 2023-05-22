import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { BeneficiaryDocument } from './beneficiary.model';
export declare class BeneficiaryRepository extends CoreRepository<BeneficiaryDocument> {
    constructor(beneficiarymodel: Model<BeneficiaryDocument>);
}
