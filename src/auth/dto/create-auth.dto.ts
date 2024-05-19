import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}


export class ResetUserPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currentPassword: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string
}
