import { ApiProperty } from '@nestjs/swagger';
/**
 * Puppy list response DTO.
 */
export class PuppyListResponseDto {
  id: number;
  @ApiProperty({ description: 'Name of the puppy' })
  name: string;

  @ApiProperty({ description: 'Age of the puppy' })
  age: number;

  @ApiProperty({ description: 'Gender of the puppy' })
  gender: string;

  @ApiProperty({ description: 'Vaccination status' })
  isVaccinated: boolean;

  @ApiProperty({ description: 'Neutered status' })
  isNeutered: boolean;

  @ApiProperty({ description: 'Size of the puppy' })
  size: string;

  @ApiProperty({ description: 'Breed of the puppy' })
  breed: string;

  @ApiProperty({ description: 'Traits of the puppy' })
  traits: string[];

  @ApiProperty({ description: 'URL of the puppy photo' })
  photoUrl: string;
}
