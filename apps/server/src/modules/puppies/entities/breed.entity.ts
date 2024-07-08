import { ApiProperty } from '@nestjs/swagger';
import { Breed as PrismaBreed } from '@prisma/client';

/**
 * Entity for a Breed
 */
export class BreedEntity implements PrismaBreed {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
