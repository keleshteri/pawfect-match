import { ApiProperty } from '@nestjs/swagger';

/**
 * A DTO that represents the response for the sign in data
 */
export class SignInDataResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The user id',
  })
  userId: number;

  @ApiProperty({
    example: '',
    description: 'The email of the user',
  })
  email: string;
}
