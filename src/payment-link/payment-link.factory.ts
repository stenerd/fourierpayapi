import { Injectable } from '@nestjs/common';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLink } from './models/payment-link.model';
import { Types } from 'mongoose';
import { PayerSheet } from './models/payer-sheet.model';

@Injectable()
export class PaymentLinkFactory {
  createNew(
    data: CreatePaymentLinkDto,
    code: string,
    user_id: string,
    link_id: string,
    base_url: string,
  ): Record<string, any> {
    const payment_link = new PaymentLink();

    for (const [key, value] of Object.entries(data)) {
      payment_link[key] = value;
    }

    payment_link.code = code;
    payment_link.charges =
      +data.amount >= 2000 ? +data.amount * 0.02 + 100 : +data.amount * 0.02;
    payment_link.link = `${base_url}/pay/${code}`;
    payment_link.creator_id = new Types.ObjectId(user_id);
    payment_link.link_id = new Types.ObjectId(link_id);

    return payment_link;
  }

  createPayerSheet(
    user_id: string,
    payment_link_id: string,
    payload: Record<string, any>,
  ): Record<string, any>[] {
    const result: Record<string, any>[] = [];

    for (let i = 0; i < payload.length; i++) {
      const data = payload[i];
      if (data['Unique Field']) {
        const sheet = new PayerSheet();
        sheet.creator_id = new Types.ObjectId(user_id);
        sheet.payment_link_id = new Types.ObjectId(payment_link_id);
        sheet.unique_answer = data['Unique Field'].trim();
        sheet.priority_1_answer = data['First Priority'];
        sheet.priority_2_answer = data['Second Priority'];
        sheet.priority_3_answer = data['Third Priority'];
        result.push(sheet);
      }
    }

    return result;
  }
}
