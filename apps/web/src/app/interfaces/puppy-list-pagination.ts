import { PaginationMetadata } from './pagination-metadata';
import { Puppy } from './puppy';

/**
 * Puppy list pagination interface.
 */
export interface PuppyListPagination {
  data: Puppy[];
  metadata: PaginationMetadata;
}
