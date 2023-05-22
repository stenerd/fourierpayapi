import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
export declare class PaymentLinkFactory {
    createNew(data: CreatePaymentLinkDto, code: string, user_id: string, link_id: string, base_url: string): Record<string, any>;
    createPayerSheet(user_id: string, payment_link_id: string, payload: Record<string, any>): Record<string, any>[];
}
