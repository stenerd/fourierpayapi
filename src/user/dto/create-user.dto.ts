import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum } from '../user.enum';

// DTO Class
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'First Name is required',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'Last Name is required',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  lastname: string;

  @ApiProperty({
    type: String,
    description: 'Email is required',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 50)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  phonenumber: string;

  @ApiProperty({
    type: String,
    description: 'Password is required',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  password: string;

  @ApiProperty({
    type: String,
    description: 'Role is required',
  })
  @IsOptional()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}

export class CreateCompleteUserDto extends CreateUserDto {
  role_id: string;
}
