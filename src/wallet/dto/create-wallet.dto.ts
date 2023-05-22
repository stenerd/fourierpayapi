import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {}

// DTO Class
export class walletWithdrawalDto {
  @ApiProperty({
    type: String,
    description: 'Amount is required',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    type: String,
    description: 'Account Number is required',
  })
  @IsString()
  @IsNotEmpty()
  account_number: string;

  @ApiProperty({
    type: String,
    description: 'Bank Code is required',
  })
  @IsString()
  @IsNotEmpty()
  bank_code: string;

  @ApiProperty({
    type: String,
    description: 'Bank Name is required',
  })
  @IsString()
  @IsNotEmpty()
  bank_name: string;

  @ApiProperty({
    type: String,
    description: 'Name is required',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
