import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PaymentLinkDocument } from '../models/payment-link.model';

@Injectable()
export class PaymentLinkRepository extends CoreRepository<PaymentLinkDocument> {
  constructor(
    @InjectModel('PaymentLink')
    paymentLinkModel: Model<PaymentLinkDocument>,
  ) {
    super(paymentLinkModel);
  }
}
