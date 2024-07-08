import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for creating an adoption application
 */
export class AdoptionApplicationCreateDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user submitting the application',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the puppy being applied for',
  })
  @IsInt()
  @IsNotEmpty()
  puppyId: number;

  @ApiProperty({
    example: '2024-07-20',
    description: 'Date of the application',
    type: 'date',
  })
  @IsDate()
  applicationDate: Date;

  @ApiProperty({ example: 'PENDING', description: 'Status of the application' })
  @IsString()
  status: string = 'PENDING';
}
