import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePaymentAffiliateDto {
  @ApiProperty({
    type: String,
    description: 'Payment link ID (ObjectId)',
    example: '64f1a2b3c4d5e6f7g8h9i0j2',
  })
  @IsString()
  paymentLinkId: string;

  @ApiProperty({
    type: String,
    description:
      'Optional parent affiliate code from ?ref= in URL (for Tier 2)',
    required: false,
    example: 'AFF123',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) =>
    (value as string)?.trim().toUpperCase(),
  )
  parentAffiliateCode?: string;
}

export class UpdatePaymentAffiliateDto {
  @ApiProperty({
    type: Number,
    description: 'Updated fixed commission amount (optional)',
    example: 6000,
  })
  @IsOptional()
  @IsNumber()
  commissionAmount?: number;
}
