import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 *  Puppy search DTO
 */
export class PuppySearchDto {
  @ApiProperty({
    required: false,
    description: 'Search puppies by name or keywords',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
