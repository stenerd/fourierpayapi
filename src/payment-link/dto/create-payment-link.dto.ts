import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import {
  FieldTypeEnum,
  PaymentLinkStateEnum,
  PaymentLinkStatusEnum,
} from '../payment-link.enum';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';

export class FormDto {
  @ApiProperty({
    type: String,
    description: 'Field Name is required',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  field_name: string;

  @ApiProperty({
    type: String,
    description: 'Fieeld Type is required',
  })
  @IsEnum(FieldTypeEnum)
  @IsNotEmpty()
  field_type: FieldTypeEnum;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  required: boolean;

  @ApiProperty()
  @IsOptional()
  @ArrayMinSize(0)
  @Type(() => String)
  options: string[];
}

export class CreatePaymentLinkDto {
  @ApiProperty({
    type: String,
    description: 'Name is required',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description is required',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  description: string;

  @ApiProperty({
    type: String,
    description: 'Unique field is required',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  unique_field: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  priority_1: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  priority_2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  priority_3: string;

  @ApiProperty({
    type: String,
    description: 'Amount is required',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  expected_number_of_payments: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expires_at: Date;

  @ApiProperty()
  @ValidateNested({
    each: true,
  })
  @ArrayMinSize(0)
  @Type(() => FormDto)
  form: FormDto[];
}

export class ChangePaymentLinkStatusDto {
  @ApiProperty()
  @IsEnum(PaymentLinkStatusEnum)
  @IsNotEmpty()
  status: PaymentLinkStatusEnum;
}

export class ChangePaymentLinkStateDto {
  @ApiProperty()
  @IsEnum(PaymentLinkStateEnum)
  @IsNotEmpty()
  state: PaymentLinkStateEnum;
}

export class ViewPaymentLinkDto extends CoreSearchFilterDatePaginationDto {
  @ApiProperty()
  @IsEnum(PaymentLinkStateEnum)
  @IsOptional()
  state: PaymentLinkStateEnum;

  @ApiProperty()
  @IsEnum(PaymentLinkStatusEnum)
  @IsOptional()
  status: PaymentLinkStatusEnum;
}
