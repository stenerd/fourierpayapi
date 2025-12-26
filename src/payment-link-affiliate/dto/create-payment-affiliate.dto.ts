import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

enum AffiliateTier {
  TIER_1 = 1,
  TIER_2 = 2,
}

export class CreatePaymentAffiliateDto {
  @ApiProperty({
    type: String,
    description: 'Affiliate user ID (ObjectId)',
    example: '64f1a2b3c4d5e6f7g8h9i0j1',
  })
  @IsString()
  @IsNotEmpty()
  affiliateId: string;

  @ApiProperty({
    type: String,
    description: 'Payment link ID (ObjectId)',
    example: '64f1a2b3c4d5e6f7g8h9i0j2',
  })
  @IsString()
  @IsNotEmpty()
  paymentLinkId: string;

  @ApiProperty({
    type: String,
    description: "The affiliate's unique code (e.g., from ?ref=)",
    example: 'AFF123',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    (value as string)?.trim().toUpperCase(),
  )
  affiliateCode: string;

  @ApiProperty({
    enum: AffiliateTier,
    description: 'Tier: 1 for direct affiliate, 2 for recruiter',
    example: 1,
  })
  @IsEnum(AffiliateTier)
  @IsNotEmpty()
  tier: AffiliateTier;

  @ApiProperty({
    type: Number,
    description: 'Fixed commission amount in ₦ per successful payment',
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty()
  commissionAmount: number;

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
