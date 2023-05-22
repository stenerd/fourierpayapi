// Nest libraries
import { ApiProperty } from '@nestjs/swagger';

// Third-party libraries
import { IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';

// DTO
export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Email. Required property.',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 100)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password. Required property.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
