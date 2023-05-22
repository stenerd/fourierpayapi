import { PaymentLink } from 'src/payment-link/models/payment-link.model';
import { InitializePaymentDto } from 'src/payment/dto/initialize-payment.dto';
import { Payment } from 'src/payment/payment.model';
import { TransactionEntity } from 'src/transaction/transaction.enum';
import { IInitializePaystack } from './paystack.interface';
export declare class PaystackFactory {
    initilizePaymentPayload(data: InitializePaymentDto, reference: string, payment_link: PaymentLink, payment: Payment, entity: TransactionEntity): IInitializePaystack;
}
