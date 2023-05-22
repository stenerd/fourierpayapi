import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PaymentLinkDocument } from '../models/payment-link.model';
export declare class PaymentLinkRepository extends CoreRepository<PaymentLinkDocument> {
    constructor(paymentLinkModel: Model<PaymentLinkDocument>);
}
