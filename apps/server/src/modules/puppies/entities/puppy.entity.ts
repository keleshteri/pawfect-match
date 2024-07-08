import { ApiProperty } from '@nestjs/swagger';
import { Puppy as PrismaPuppy } from '@prisma/client';
import { BreedEntity } from './breed.entity';
import { TraitEntity } from './trait.entity';

/**
 * Entity for a Puppy
 */
export class PuppyEntity implements PrismaPuppy {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  breedId: number | null;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty({ required: false, type: () => BreedEntity })
  breed?: BreedEntity;

  @ApiProperty({ required: false, type: () => [TraitEntity] })
  traits?: TraitEntity[];
  HealthRecord: any;
}
