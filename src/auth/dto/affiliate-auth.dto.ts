import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class AffiliateRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  parent_ref?: string;
}

export class AffiliateLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string; // ← Now login with email

  @IsString()
  @IsNotEmpty()
  password: string;
}
