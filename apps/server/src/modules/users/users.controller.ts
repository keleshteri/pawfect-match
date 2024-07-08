import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

/**
 * Controller for managing users.
 */
@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  /**
   * Constructor.
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find a user by email.
   * @param email
   * @returns
   */
  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
