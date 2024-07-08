import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdoptionApplicationCreateDto } from './dtos/adoption-application-create.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AdoptionApplicationCreateWithUserDto } from './dtos/adoption-application-create-user.dto';

@Injectable()
export class AdoptionApplicationService {
  private readonly logger = new Logger(AdoptionApplicationService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   *  Handle the adoption application process.
   * @param userDto
   * @param appDto
   * @returns
   */
  async handleApplication(appDto: AdoptionApplicationCreateWithUserDto) {
    try {
      let user = await this.prismaService.user.findUnique({
        where: { email: appDto.email },
      });

      // If user doesn't exist, create a new user
      if (!user) {
        user = await this.prismaService.user.create({
          data: {
            name: appDto.name,
            email: appDto.email,
            password: 'password123',
            role: appDto.role,
            preferredBreedId: appDto.preferredBreedId,
            hasOtherPets: appDto.hasOtherPets,
            preferredAgeRange: appDto.preferredAgeRange,
          },
        });
      }

      // Now create the adoption application
      return this.prismaService.adoptionApplication.create({
        data: {
          userId: user.id,
          puppyId: appDto.puppyId,
          applicationDate: appDto.applicationDate,
          status: appDto.status,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  /**
   * Create a new adoption application.
   * @param data
   * @returns
   */
  async create(data: AdoptionApplicationCreateDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      this.logger.error(`User with ID ${data.userId} does not exist`);
      throw new NotFoundException(`User with ID ${data.userId} does not exist`);
    }
    this.logger.log(`Creating a new adoption application`);
    return this.prismaService.adoptionApplication.create({
      data,
    });
  }

  /**
   * Find all adoption applications.
   * @returns
   */
  async findAll() {
    this.logger.log(`Finding all adoption applications`);
    return this.prismaService.adoptionApplication.findMany();
  }

  /**
   * Find an adoption application by ID.
   * @param id
   * @returns
   */
  async findOne(id: number) {
    this.logger.log(`Finding adoption application with ID ${id}`);
    return this.prismaService.adoptionApplication.findUnique({
      where: { id },
    });
  }
}
