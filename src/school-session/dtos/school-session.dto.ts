import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolSessionSettingDto {
  @ApiProperty({
    type: String,
    description: 'School Session Setting Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'School Session Setting Tag',
  })
  @IsNotEmpty()
  @IsString()
  tag: string;

  @ApiProperty({
    type: String,
    description: 'School Session Setting Tag',
  })
  @IsNotEmpty()
  @IsString()
  start_year: string;

  @ApiProperty({
    type: String,
    description: 'School Session Setting Tag',
  })
  @IsNotEmpty()
  @IsString()
  end_year: string;
}

// export class FetchSubscriptionSettingFilterDto {
//   @ApiProperty()
//   @IsEnum(FetchSubscriptionSettingFilterEnum)
//   @IsOptional()
//   status: FetchSubscriptionSettingFilterEnum;
// }

// export class ChangeSubscriptionSettingStateDto {
//   @ApiProperty()
//   @IsEnum(FetchSubscriptionSettingFilterEnum)
//   @IsNotEmpty()
//   status: FetchSubscriptionSettingFilterEnum;
// }

// export class SubscribeDto {
//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   subscription_setting_id: string;
// }
