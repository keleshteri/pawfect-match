import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, IsUrl } from 'class-validator';
/**
 * DTO for creating a new puppy.
 */
export class CreatePuppyDto {
  @ApiProperty({
    description: 'The name of the puppy',
    example: 'Fluffy',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The age of the puppy',
    example: 2,
  })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({
    description: 'The Gender of the puppy',
    example: 'Male',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'The size of the puppy',
    example: 'Small',
  })
  @IsString()
  size: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  breedId?: number;

  @ApiProperty({
    required: false,
    example:
      'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @ApiProperty({ type: [Number], isArray: true, example: [1, 2, 3] })
  @IsOptional()
  @IsInt({ each: true })
  traitIds: number[];
}
