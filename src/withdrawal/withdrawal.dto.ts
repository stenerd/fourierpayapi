import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionStatus } from 'src/transaction/transaction.enum';

export class ViewWithdrawalDto extends CoreSearchFilterDatePaginationDto {
  @ApiProperty()
  @IsEnum(TransactionStatus)
  @IsOptional()
  status: TransactionStatus;
}
