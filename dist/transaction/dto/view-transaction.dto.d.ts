import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionEntity, TransactionStatus, TransactionType } from 'src/transaction/transaction.enum';
export declare class ViewTransactionDto extends CoreSearchFilterDatePaginationDto {
    status: TransactionStatus;
    type: TransactionType;
    entity: TransactionEntity;
}
