import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  FetchSubscriptionSettingFilterEnum,
  SubscriptionNameEnum,
  SubscriptionTagEnum,
} from '../subscription.enum';

export class CreateSubscriptionSettingDto {
  @ApiProperty({
    type: String,
    description: 'Name is required',
  })
  @IsEnum(SubscriptionNameEnum)
  @IsNotEmpty()
  name: SubscriptionNameEnum;

  @ApiProperty({
    type: String,
    description: 'Tag is required',
  })
  @IsEnum(SubscriptionTagEnum)
  @IsNotEmpty()
  tag: SubscriptionTagEnum;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class FetchSubscriptionSettingFilterDto {
  @ApiProperty()
  @IsEnum(FetchSubscriptionSettingFilterEnum)
  @IsOptional()
  status: FetchSubscriptionSettingFilterEnum;
}

export class ChangeSubscriptionSettingStateDto {
  @ApiProperty()
  @IsEnum(FetchSubscriptionSettingFilterEnum)
  @IsNotEmpty()
  status: FetchSubscriptionSettingFilterEnum;
}

export class SubscribeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subscription_setting_id: string;
}
