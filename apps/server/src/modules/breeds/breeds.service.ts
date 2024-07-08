import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service for breeds
 */
@Injectable()
export class BreedsService {
  private readonly logger = new Logger(BreedsService.name);

  constructor(private prismaService: PrismaService) {}
  /**
   * Get all breeds
   * @returns all breeds
   */
  async getAllBreeds(): Promise<string[]> {
    const breeds = await this.prismaService.breed.findMany();
    return breeds.map((breed) => breed.name);
  }

  /**
   *  Get all breeds with ids
   * @returns
   */
  async getBreedsWithIds(): Promise<{ id: number; name: string }[]> {
    const breeds = await this.prismaService.breed.findMany();
    return breeds;
  }
}
