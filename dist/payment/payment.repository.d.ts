import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PaymentDocument } from './payment.model';
export declare class PaymentRepository extends CoreRepository<PaymentDocument> {
    constructor(paymentModel: Model<PaymentDocument>);
}
