import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @ApiProperty({
    type: String,
    description: 'Reference is required',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;
}
