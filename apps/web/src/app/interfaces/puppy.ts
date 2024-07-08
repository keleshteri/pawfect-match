/**
 * Puppy interface
 */
export interface Puppy {
  id: number;
  name: string;
  gender: string;
  age: number;
  size: string;
  breed: string;
  breedId: number;
  photoUrl: string;
  description: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  traits: string[];
  healthRecords: any[];
}
