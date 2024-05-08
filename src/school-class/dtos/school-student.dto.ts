import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolStudentDto {
  @ApiProperty({
    type: String,
    school_id: 'School Session Setting Name',
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
