import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import {
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from 'src/transaction/transaction.enum';

export class ViewTransactionDto extends CoreSearchFilterDatePaginationDto {
  @ApiProperty()
  @IsEnum(TransactionStatus)
  @IsOptional()
  status: TransactionStatus;

  @ApiProperty()
  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;

  @ApiProperty()
  @IsEnum(TransactionEntity)
  @IsOptional()
  entity: TransactionEntity;
}
