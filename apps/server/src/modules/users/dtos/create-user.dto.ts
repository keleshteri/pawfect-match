import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

/**
 * Data transfer object for creating a user.
 */
export class CreateUserDto {
  @ApiProperty({
    example: 'Mike Keleshteri',
    description: 'The name of the user',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'mehdi.shaban.keleshteri@outlook.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user',
  })
  @IsOptional()
  @IsString()
  role?: string = 'USER';

  @ApiProperty({
    example: '1',
  })
  @IsOptional()
  preferredBreedId?: number;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  preferredAgeRange?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user has other pets',
  })
  @IsBoolean()
  hasOtherPets: boolean = false;
}
