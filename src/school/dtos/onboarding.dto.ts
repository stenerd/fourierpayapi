import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

// DTO Class
export class SchoolOnboardingDto {
  @ApiProperty({
    type: String,
    description: 'The name of the school',
  })
  @IsString({ message: 'School name must be a string' })
  @IsNotEmpty({ message: 'School name is required' })
  @Length(3, 100, {
    message: 'School name must be longer than or equal to 3 characters',
  })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  school_name: string;

  @ApiProperty({
    type: String,
    description: 'The name of the school admin',
  })
  @IsString({ message: 'School admin name must be a string' })
  @IsNotEmpty({ message: 'School admin name is required' })
  @Length(3, 100, {
    message: 'School admin must be longer than or equal to 3 characters',
  })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  school_admin_name: string;

  @ApiProperty({
    type: String,
    description: 'The email of the school',
  })
  @IsEmail({}, { message: 'School email must have an email format' })
  @IsNotEmpty({ message: 'School email is required' })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  school_email: string;

  @IsOptional()
  @IsString({ message: 'School mobile number must be a string' })
  @Length(8, 50, {
    message:
      'School mobile number must be longer than or equal to 8 characters',
  })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  school_mobile_number: string;

  @ApiProperty({
    type: String,
    description: 'The school password',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, {
    message: 'Password must be longer than or equal to 8 characters',
  })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  password: string;

  @IsOptional()
  @IsString({ message: 'School logo must be a string' })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  school_logo: string;

  @IsOptional()
  @IsString({ message: 'School banner must be a string' })
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  school_banner: string;

  @IsOptional()
  @IsNumber({}, { message: 'Number of students must be a number' })
  number_of_students: number;
}
