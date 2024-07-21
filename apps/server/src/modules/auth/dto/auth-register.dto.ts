import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Auth register DTO
 */
export class AuthRegisterDto {
  /**
   * Email
   */
  @ApiProperty({
    example: 'mike@example.com',
    description: 'The email of the user',
    format: 'email',
    type: 'string',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  /**
   * Password
   */
  @ApiProperty({
    example: 'password12345678',
    description: 'The password of the user',
    format: 'password',
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  /**
   * name
   */
  @ApiProperty({
    example: 'Mike',
    description: 'The name of the user',
    format: 'name',
    type: 'string',
  })
  @IsNotEmpty()
  name: string;
}
