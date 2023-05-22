import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionStatus } from 'src/transaction/transaction.enum';
export declare class ViewWithdrawalDto extends CoreSearchFilterDatePaginationDto {
    status: TransactionStatus;
}
