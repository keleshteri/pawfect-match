import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PuppyFilterDto } from './dtos/puppy-filter.dto';
import { PaginationDto } from '../common/dtos';
import { ExtendedPuppy, PuppiesMapperService } from './puppies.mapper.service';
import { PuppySearchDto } from './dtos/puppy-search.dto';
import { Prisma } from '@prisma/client';
import { UpdatePuppyDto } from './dtos/update-puppy.dto';

/**
 * Service for managing puppies.
 */
@Injectable()
export class PuppiesService {
  private readonly logger = new Logger(PuppiesService.name);

  /**
   * Constructor for the Puppies service.
   * @param prismaService
   */
  constructor(
    private prismaService: PrismaService,
    private readonly puppiesMapperService: PuppiesMapperService,
  ) {
    this.logger.log('Puppies service initialized');
  }

  /**
   * Get a puppy by id
   * @param id
   * @returns
   */
  async getAPuppyById(puppyId: number) {
    try {
      const puppy = this.prismaService.puppy.findUnique({
        where: {
          id: puppyId,
        },
        include: {
          breed: true,
          traits: {
            include: {
              trait: true,
            },
          },
          HealthRecord: {
            include: {
              vaccinations: {
                include: {
                  vaccine: true,
                },
              },
            },
          },
        },
      });

      return this.puppiesMapperService.mapToPuppyDetailsDto(
        (await puppy) as unknown as ExtendedPuppy,
      );
    } catch (error) {
      this.logger.error('Failed to get puppy by id', error);
      throw error;
    }
  }

  /**
   * Get all puppies.
   */
  async getAllPuppies(filterDto: PuppyFilterDto, paginationDto: PaginationDto) {
    const { breed, age, size, gender } = filterDto;
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit ?? 0;
    // condition to filter puppies
    const whereClause = {
      // ...(breed && { breed: { name: breed } }),
      ...(breed?.trim() && { breed: { name: breed } }),
      // ...(age !== undefined && { age }),
      ...(typeof age === 'number' && age > 0 && { age }),
      ...(gender?.trim() && { gender: gender.toLocaleLowerCase() }),
      // ...(size && { size: size.toLocaleLowerCase() }),
      ...(size?.trim() && { size: size.toLocaleLowerCase() }),
    };
    const [total, puppies] = await Promise.all([
      this.prismaService.puppy.count({
        where: whereClause,
      }),
      this.prismaService.puppy.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          breed: true,
          traits: {
            include: {
              trait: true,
            },
          },
          HealthRecord: {
            include: {
              vaccinations: true,
            },
          },
        },
      }),
    ]);
    const pageCount = Math.ceil(total / limit);

    return {
      data: puppies.map((puppy) =>
        this.puppiesMapperService.mapToPuppyListResponseDto(
          puppy as unknown as ExtendedPuppy,
        ),
      ),
      metadata: {
        total,
        pageCount,
        currentPage: page,
      },
    };
  }

  /**
   * Search puppies by name or keywords.
   */
  async searchPuppies(searchDto: PuppySearchDto, paginationDto: PaginationDto) {
    const { search } = searchDto;
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit ?? 0;
    try {
      const whereClause: Prisma.PuppyWhereInput = search
        ? {
            OR: [
              { name: { contains: search } },
              { breed: { name: { contains: search } } },
              { size: { contains: search } },
              { gender: { contains: search } },
            ],
          }
        : {};

      const [total, puppies] = await Promise.all([
        this.prismaService.puppy.count({ where: whereClause }),
        this.prismaService.puppy.findMany({
          where: whereClause,
          skip,
          take: limit,
          include: {
            breed: true,
            traits: { include: { trait: true } },
            HealthRecord: { include: { vaccinations: true } },
          },
        }),
      ]);

      return {
        data: puppies.map((puppy) =>
          this.puppiesMapperService.mapToPuppyListResponseDto(
            puppy as unknown as ExtendedPuppy,
          ),
        ),
        metadata: {
          total,
          pageCount: Math.ceil(total / limit),
          currentPage: page,
        },
      };
    } catch (error) {
      this.logger.error('Failed to search puppies', error);
      throw error;
    }
  }

  /**
   * create a new puppy.
   */
  async createPuppy(createPuppyDto: any) {
    this.logger.log(
      `Creating puppy with data: ${JSON.stringify(createPuppyDto)}`,
    );
    if (
      !Array.isArray(createPuppyDto.traitIds) ||
      !createPuppyDto.traitIds.every((id: any) => typeof id === 'number')
    ) {
      throw new BadRequestException('Invalid traitIds provided');
    }

    try {
      return this.prismaService.puppy.create({
        data: {
          name: createPuppyDto.name,
          age: createPuppyDto.age,
          gender: createPuppyDto.gender,
          size: createPuppyDto.size,
          breedId: createPuppyDto.breedId,
          photoUrl: createPuppyDto.photoUrl,
          // traits
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to create a puppy: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Update a puppy.
   */
  async updatePuppy(id: number, updatePuppyDto: UpdatePuppyDto) {
    return this.prismaService.puppy.update({
      where: { id: id },
      data: updatePuppyDto,
    });
  }

  /**
   * Delete a puppy.
   */
  async deletePuppy(id: number) {
    return this.prismaService.puppy.delete({ where: { id } });
  }
}
