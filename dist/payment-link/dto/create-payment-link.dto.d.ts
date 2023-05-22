import { FieldTypeEnum, PaymentLinkStateEnum, PaymentLinkStatusEnum } from '../payment-link.enum';
export declare class FormDto {
    field_name: string;
    field_type: FieldTypeEnum;
    required: boolean;
    options: string[];
}
export declare class CreatePaymentLinkDto {
    name: string;
    description: string;
    unique_field: string;
    priority_1: string;
    priority_2: string;
    priority_3: string;
    amount: number;
    expected_number_of_payments: number;
    expires_at: Date;
    form: FormDto[];
}
export declare class ChangePaymentLinkStatusDto {
    status: PaymentLinkStatusEnum;
}
export declare class ChangePaymentLinkStateDto {
    state: PaymentLinkStateEnum;
}
