import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PayerSheetDocument } from '../models/payer-sheet.model';

@Injectable()
export class PayerSheetRepository extends CoreRepository<PayerSheetDocument> {
  constructor(
    @InjectModel('PayerSheet')
    payerSheetModel: Model<PayerSheetDocument>,
  ) {
    super(payerSheetModel);
  }
}
