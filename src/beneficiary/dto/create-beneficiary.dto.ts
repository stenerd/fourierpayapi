import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResolveAccountNumberDto } from 'src/paystack/dto/resolve-account-number.dto';

export class CreateBeneficiaryDto extends ResolveAccountNumberDto {
  @ApiProperty({
    type: String,
    description: 'Bank Name is required',
  })
  @IsString()
  @IsNotEmpty()
  bank_name: string;
}
