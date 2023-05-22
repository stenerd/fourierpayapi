import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ChartTypeEnum } from '../dashboard.enum';

export class ChartQueryDto {
  @ApiProperty({
    type: ChartTypeEnum,
    description: 'type is required',
  })
  @IsEnum(ChartTypeEnum)
  @IsNotEmpty()
  type: ChartTypeEnum;

  @ApiProperty({
    type: String,
    description: 'year is required',
  })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    type: String,
    description: 'param is required',
  })
  @IsOptional()
  @IsNotEmpty()
  param: string;
}
