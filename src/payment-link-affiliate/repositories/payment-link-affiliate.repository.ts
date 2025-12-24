import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PaymentAffiliateDocument } from '../models/payment-link-affiliate.model';

@Injectable()
export class PaymentAffiliateRepository extends CoreRepository<PaymentAffiliateDocument> {
  constructor(
    @InjectModel('PaymentAffiliate')
    paymentAffiliateModel: Model<PaymentAffiliateDocument>,
  ) {
    super(paymentAffiliateModel);
  }
}
