import { ApiProperty } from '@nestjs/swagger';
import { PuppyListResponseDto } from './puppy-list-response.dto';
import { PaginationMetadataDto } from 'src/modules/common/dtos';

/**
 * Puppy list pagination DTO.
 */
export class PuppyListPaginationDto {
  @ApiProperty({
    type: () => [PuppyListResponseDto],
    description: 'List of puppies',
  })
  data: PuppyListResponseDto[];

  @ApiProperty({
    type: () => PaginationMetadataDto,
    description: 'Pagination metadata',
  })
  metadata: PaginationMetadataDto;
}
