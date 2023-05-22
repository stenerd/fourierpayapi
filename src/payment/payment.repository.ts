import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { PaymentDocument } from './payment.model';

@Injectable()
export class PaymentRepository extends CoreRepository<PaymentDocument> {
  constructor(
    @InjectModel('Payment')
    paymentModel: Model<PaymentDocument>,
  ) {
    super(paymentModel);
  }
}
