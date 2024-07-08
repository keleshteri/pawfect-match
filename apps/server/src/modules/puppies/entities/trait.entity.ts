import { ApiProperty } from '@nestjs/swagger';
import { Trait as PrismaTrait } from '@prisma/client';

/**
 * Entity for a Trait
 */
export class TraitEntity implements PrismaTrait {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;
}
