import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AffiliateRegisterDto {
  @ApiProperty({ description: 'First Name' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  firstname: string;

  @ApiProperty({ description: 'Last Name' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  lastname: string;

  @ApiProperty({ description: 'Phone Number' })
  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @ApiProperty({ description: 'Email Address' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    (value as string)?.trim().toLowerCase(),
  )
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  @Transform(({ value }: TransformFnParams) => (value as string)?.trim())
  password: string;
}

export class AffiliateLoginDto {
  @ApiProperty({ description: 'Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
