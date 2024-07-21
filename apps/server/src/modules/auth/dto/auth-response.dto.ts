import { ApiProperty } from '@nestjs/swagger';

/**
 * Auth response DTO
 */
export class AuthResponseDto {
  /**
   * The access token
   */
  @ApiProperty({
    example: 'fake-access',
    description: 'The access token',
  })
  accessToken: string;

  /**
   * The user id
   */
  @ApiProperty({
    example: 1,
    description: 'The user id',
  })
  userId: number;

  /**
   * The email of the user
   */
  @ApiProperty({
    example: '',
    description: 'The email of the user',
  })
  email: string;
}
