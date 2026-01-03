import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PaymentAffiliateDocument } from '../models/payment-link-affiliate.model';
export declare class PaymentAffiliateRepository extends CoreRepository<PaymentAffiliateDocument> {
    constructor(paymentAffiliateModel: Model<PaymentAffiliateDocument>);
}
