import { ApiProperty } from '@nestjs/swagger';

export class VaccinationDto {
  @ApiProperty({ description: 'Date the vaccine was administered' })
  vaccinatedOn: Date;

  @ApiProperty({ description: 'Date when the next vaccine is due' })
  nextDueDate?: Date | null;
  @ApiProperty({ description: 'Name of the vaccine' })
  vaccineName: string;
}
export class HealthRecordDto {
  @ApiProperty({ description: 'Whether the puppy is neutered' })
  neuteredStatus: boolean;

  @ApiProperty({ description: 'Medical notes' })
  medicalNotes: string;

  @ApiProperty({ description: 'List of vaccinations' })
  vaccinations: VaccinationDto[];
}
/**
 * Data transfer object for puppy details
 */
export class PuppyDetailsDto {
  @ApiProperty({ description: 'Unique identifier of the puppy' })
  id: number;

  @ApiProperty({ description: 'Name of the puppy' })
  name: string;

  @ApiProperty({ description: 'Age of the puppy in years' })
  age: number;

  @ApiProperty({ description: 'Gender of the puppy' })
  gender: string;

  @ApiProperty({ description: 'Size category of the puppy' })
  size: string;

  @ApiProperty({ description: "URL for the puppy's photo" })
  photoUrl: string;

  @ApiProperty({ description: 'Breed information' })
  breed: string;

  @ApiProperty({
    type: () => [String],
    description: 'List of traits associated with the puppy',
  })
  traits: string[];

  @ApiProperty({
    type: () => [HealthRecordDto],
    description: 'Health records of the puppy',
  })
  healthRecords: HealthRecordDto[];
}
