import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**
 * Pagination metadata DTO.
 */
export class PaginationMetadataDto {
  @IsNumber()
  @ApiProperty({ description: 'Total number of items available' })
  total: number;

  @IsNumber()
  @ApiProperty({ description: 'Total number of pages available' })
  pageCount: number;

  @IsNumber()
  @ApiProperty({ description: 'Current page number' })
  currentPage: number;
}
