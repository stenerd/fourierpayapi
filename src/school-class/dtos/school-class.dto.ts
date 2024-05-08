import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolClassDto {
  @ApiProperty({
    type: String,
    description: 'School Identifier',
  })
  @IsString()
  @IsNotEmpty()
  school_id: number;

  @ApiProperty({
    type: String,
    description: 'Name of the class Identifier',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Field used to filter the forms',
  })
  @IsString()
  @IsNotEmpty()
  unique_field: number;

  @ApiProperty({
    type: String,
    description: 'Field Used to Filter ',
  })
  @IsNotEmpty()
  @IsString()
  priority_1: string;

  @ApiProperty({
    type: String,
    description: 'Field Used to Filter ',
  })
  @IsNotEmpty()
  @IsString()
  priority_2: string;

  @ApiProperty({
    type: String,
    description: 'Field Used to Filter ',
  })
  @IsNotEmpty()
  @IsString()
  priority_3: string;

  @ApiProperty({
    type: String,
    description: 'Urls of the students in a class ',
  })
  @IsNotEmpty()
  @IsString()
  urls: Array<string>;

  @ApiProperty({
    type: String,
    description: 'Form structure of the students ',
  })
  @IsNotEmpty()
  @IsString()
  form_structure: object;
}