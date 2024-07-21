import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 *  A DTO that represents the login data
 */
export class AuthLoginDto {
  @ApiProperty({
    example: 'mike@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password12345678',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  password: string;
}
