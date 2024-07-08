import { Injectable } from '@nestjs/common';
import {
  Breed,
  HealthRecord,
  Puppy as PrismaPuppy,
  Trait,
  Vaccination,
} from '@prisma/client';
import { PuppyListResponseDto } from './dtos/puppy-list-response.dto';
import { PuppyDetailsDto } from './dtos/puppy-details.response';

/**
 * Interface for an extended puppy trait.
 */
export interface ExtendedPuppyTrait {
  trait: {
    description: string;
  } | null;
}
/**
 * Interface for an extended health record.
 */
export interface ExtendedHealthRecord extends HealthRecord {
  neuteredStatus: boolean;
  medicalNotes: string | null;
  vaccinations: ExtendedVaccination[];
}
export interface ExtendedVaccination extends Vaccination {
  vaccine: {
    id: number;
    name: string;
  };
}
/**
 * Interface for an extended puppy.
 * */
export interface ExtendedPuppy extends PrismaPuppy {
  breed?: Breed;
  //   traits?: Trait[];
  traits: ExtendedPuppyTrait[];
  HealthRecord: ExtendedHealthRecord[];
}
/**
 * Service for mapping puppies.
 */
@Injectable()
export class PuppiesMapperService {
  mapToPuppyListResponseDto(puppy: ExtendedPuppy): PuppyListResponseDto {
    return {
      id: puppy.id,
      name: puppy.name,
      age: puppy.age,
      gender: puppy.gender,
      isVaccinated: this.isPuppyVaccinated(puppy.HealthRecord),
      isNeutered: this.isPuppyNeutered(puppy.HealthRecord),
      size: puppy.size,
      breed: puppy.breed?.name || 'Unknown',
      traits:
        puppy.traits?.map((t) => t.trait?.description || 'Unknown Trait') || [],
      photoUrl: puppy.photoUrl,
    };
  }

  mapToPuppyDetailsDto(puppy: ExtendedPuppy): PuppyDetailsDto {
    return {
      id: puppy.id,
      name: puppy.name,
      age: puppy.age,
      gender: puppy.gender,
      size: puppy.size,
      photoUrl: puppy.photoUrl,
      breed: puppy.breed?.name ?? 'Unknown',
      traits: puppy.traits.map((t) => t.trait?.description || 'Unknown Trait'),
      healthRecords: puppy.HealthRecord.map((record) => ({
        neuteredStatus: record.neuteredStatus || false,
        medicalNotes: record.medicalNotes || 'No medical notes',
        vaccinations: record.vaccinations.map((v) => ({
          vaccinatedOn: v.vaccinatedOn,
          nextDueDate: v.nextDueDate || null,
          vaccineName: v.vaccine?.name || 'Unknown Vaccine',
        })),
      })),
    };
  }

  /**
   *  Check if the puppy is vaccinated.
   * @param healthRecords
   * @returns
   */
  private isPuppyVaccinated(healthRecords: ExtendedHealthRecord[]): boolean {
    return healthRecords.some(
      (record) =>
        record.vaccinations &&
        record.vaccinations.some((vaccination) =>
          this.isVaccinationValid(vaccination),
        ),
    );
  }

  /**
   *  Check if the vaccination is valid.
   * @param vaccination
   * @returns
   */
  private isVaccinationValid(vaccination: Vaccination): boolean {
    const today = new Date();
    return vaccination.nextDueDate ? vaccination.nextDueDate > today : false;
  }

  /**
   *  Check if the puppy is neutered.
   * @param healthRecords
   * @returns
   */
  private isPuppyNeutered(healthRecords: HealthRecord[]): boolean {
    return healthRecords.some((record) => record.neuteredStatus);
  }
}
