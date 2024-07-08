import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

/**
 * Puppy filter DTO
 */
export class PuppyFilterDto {
  @ApiPropertyOptional({ description: 'Filter by breed of the puppy' })
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiPropertyOptional({
    description: 'Filter by age of the puppy',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  age?: number;

  @ApiPropertyOptional({ description: 'Filter by size of the puppy' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({ description: 'Filter by gender of the puppy' })
  @IsOptional()
  @IsString()
  gender?: string;
}
