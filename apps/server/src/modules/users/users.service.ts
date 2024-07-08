import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  /**
   *  Constructor.
   * @param PrismaService
   */
  constructor(private readonly PrismaService: PrismaService) {}

  /**
   *  Create a new user.
   * @param data
   * @returns
   */
  async create(data: CreateUserDto) {
    this.logger.log(`Creating a new user`);
    return this.PrismaService.user.create({
      data,
    });
  }

  /**
   * Find a user by email.
   * @param email
   * @returns
   */
  async findByEmail(email: string) {
    this.logger.log(`Finding user by email: ${email}`);
    return this.PrismaService.user.findUnique({
      where: { email },
    });
  }
}
