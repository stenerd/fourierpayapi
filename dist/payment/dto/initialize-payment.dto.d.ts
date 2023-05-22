import { FormDto } from 'src/payment-link/dto/create-payment-link.dto';
export declare class FormAnswerDto extends FormDto {
    answer: string;
}
export declare class InitializePaymentDto {
    payment_link_id: string;
    amount: number;
    form: FormAnswerDto[];
}
