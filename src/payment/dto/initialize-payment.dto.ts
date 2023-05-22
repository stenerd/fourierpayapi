import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FormDto } from 'src/payment-link/dto/create-payment-link.dto';

export class FormAnswerDto extends FormDto {
  @IsString()
  @IsOptional()
  answer: string;
}

export class InitializePaymentDto {
  // @ApiProperty({
  //   type: String,
  //   description: 'Reference is required',
  // })
  // @IsString()
  // @IsNotEmpty()
  // reference: string;

  @ApiProperty({
    type: String,
    description: 'Payment link id is required',
  })
  @IsString()
  @IsNotEmpty()
  payment_link_id: string;

  @ApiProperty({
    type: String,
    description: 'Amount is required',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ValidateNested({
    each: true,
  })
  @ArrayMinSize(0)
  @Type(() => FormAnswerDto)
  form: FormAnswerDto[];
}
