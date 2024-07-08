import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PuppiesService } from './puppies.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dtos';
import { PuppyFilterDto } from './dtos/puppy-filter.dto';
import { PuppyListPaginationDto } from './dtos/puppy-list-pagination.dto';
import { PuppySearchDto } from './dtos/puppy-search.dto';
import { CreatePuppyDto } from './dtos/create-puppy.dto';
import { UpdatePuppyDto } from './dtos/update-puppy.dto';

@ApiTags('puppies')
@Controller('puppies')
export class PuppiesController {
  private readonly logger = new Logger(PuppiesController.name);
  /**
   * Constructor for the Puppies controller.
   */
  constructor(private readonly puppiesService: PuppiesService) {
    this.logger.log('Puppies controller initialized');
  }

  /**
   * Get all puppies.
   */
  @Get()
  @ApiOkResponse({
    description: 'Get all available puppies with optional filters',
  })
  async getAllPuppies(
    @Query() paginationDto: PaginationDto,
    @Query() puppyFilterDto: PuppyFilterDto,
  ): Promise<PuppyListPaginationDto> {
    this.logger.log('Get all puppies');
    return this.puppiesService.getAllPuppies(puppyFilterDto, paginationDto);
  }

  /**
   * Get a puppy by id
   * @param id
   * @returns
   */
  @Get('puppy/:id')
  @ApiOkResponse({
    description: 'Get a puppy by id',
  })
  async getPuppyById(@Param('id') id: string) {
    return await this.puppiesService.getAPuppyById(+id);
  }

  /**
   * search for puppies by name or other keywords
   * @param searchDto
   * @param paginationDto
   * @returns
   */
  @Get('search')
  @ApiOkResponse({
    description: 'Search for puppies by name or other keywords',
  })
  async searchPuppies(
    @Query() searchDto: PuppySearchDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.puppiesService.searchPuppies(searchDto, paginationDto);
  }

  /**
   * createPuppy
   * @param puppyDto
   * @returns
   */
  @Post('/admin/add-puppy')
  @ApiOkResponse({
    description: 'Add a new puppy to the database',
  })
  async createPuppy(@Body() puppyDto: CreatePuppyDto) {
    return await this.puppiesService.createPuppy(puppyDto);
  }

  /**
   * updatePuppy: Edit details of an existing puppy.
   * @param id
   * @param puppyDto
   * @returns
   */
  @Patch('/admin/edit-puppy/:id')
  @ApiOkResponse({ description: 'Edit details of an existing puppy.' })
  async updatePuppy(@Param('id') id: string, @Body() puppyDto: UpdatePuppyDto) {
    return await this.puppiesService.updatePuppy(+id, puppyDto);
  }

  /**
   *  Delete a puppy from the system.
   * @param id
   * @returns
   */
  @Delete('/admin/delete-puppy/:id')
  @ApiOkResponse({ description: 'Remove a puppy from the system.' })
  async deletePuppy(@Param('id') id: string) {
    return await this.puppiesService.deletePuppy(+id);
  }
}
