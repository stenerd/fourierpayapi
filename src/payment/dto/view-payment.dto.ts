import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionStatus } from 'src/transaction/transaction.enum';

export class ViewPaymentDto extends CoreSearchFilterDatePaginationDto {
  @ApiProperty()
  @IsEnum(TransactionStatus)
  @IsOptional()
  status: TransactionStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  priority_1_answer: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  priority_2_answer: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  priority_3_answer: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  unique_answer: string;
}
