import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionStatus } from 'src/transaction/transaction.enum';
export declare class ViewPaymentDto extends CoreSearchFilterDatePaginationDto {
    status: TransactionStatus;
    priority_1_answer: string;
    priority_2_answer: string;
    priority_3_answer: string;
    unique_answer: string;
}
