import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AffiliateSettingsDto {
  @ApiProperty({
    type: Boolean,
    description: 'Enable or disable affiliate program for this link',
    example: true,
  })
  @IsBoolean()
  affiliateEnabled: boolean;

  @ApiProperty({
    type: Number,
    description: 'Fixed commission amount for Tier 1 (direct affiliate)',
    example: 5000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  tier1FixedAmount?: number;

  @ApiProperty({
    type: Number,
    description: 'Fixed commission amount for Tier 2 (recruiter)',
    example: 2000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  tier2FixedAmount?: number;
}
