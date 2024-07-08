import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BreedsService } from './breeds.service';

/**
 * Controller for breeds
 */
@ApiTags('breeds')
@Controller('breeds')
export class BreedsController {
  private readonly logger = new Logger(BreedsController.name);

  constructor(private readonly breedsService: BreedsService) {}

  /**
   *  Get all breeds
   * @returns all breeds
   */
  @Get()
  async getAllBreeds() {
    return await this.breedsService.getAllBreeds();
  }

  /**
   *  Get all breeds with ids
   * @returns all breeds with ids
   */
  @Get('ids')
  async getBreedsWithIds() {
    return await this.breedsService.getBreedsWithIds();
  }
}
