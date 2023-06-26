import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PaymentLink } from 'src/payment-link/models/payment-link.model';
import { InitializePaymentDto } from 'src/payment/dto/initialize-payment.dto';
import { Payment } from 'src/payment/payment.model';
import { TransactionEntity } from 'src/transaction/transaction.enum';
import { User } from 'src/user/user.model';
import { IInitializePaystack } from './paystack.interface';

@Injectable()
export class PaystackFactory {
  initilizePaymentPayload(
    data: InitializePaymentDto,
    reference: string,
    payment_link: PaymentLink,
    payment: Payment,
    entity: TransactionEntity,
  ): IInitializePaystack {
    const user: Record<string, any> = payment_link.creator_id;

    const payload: IInitializePaystack = {
      reciever_id: user._id.toString(),
      entity: entity,
      entity_id: payment._id,
      amount: (data.amount + payment_link.charges) * 100,
      email: `${reference}@fourierpay.com`,
      reference,
      currency: 'NGN',
      metadata: {
        payer_id: null,
        reciever_id: user._id.toString(),
        entity,
        entity_id: payment._id,
        amount: data.amount,
        email: user.email,
        others: data.form,
      },
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    };

    return payload;
  }
}
