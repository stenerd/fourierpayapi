import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PayerSheetDocument } from '../models/payer-sheet.model';
export declare class PayerSheetRepository extends CoreRepository<PayerSheetDocument> {
    constructor(payerSheetModel: Model<PayerSheetDocument>);
}
