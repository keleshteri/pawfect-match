import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { SignInDataResponseDto } from './dto/sign-in-data-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

/**
 * Service that provides authentication functionality.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *  Authenticate
   * @param input
   * @returns
   */
  async authenticate(input: AuthLoginDto): Promise<AuthResponseDto | null> {
    const user: SignInDataResponseDto | null = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      accessToken: this.jwtService.sign({
        userId: user.userId,
        email: user.email,
      }),
      userId: user.userId,
      email: user.email,
    };
  }

  /**
   *  Validate user
   * @param input
   * @returns
   */
  async validateUser(
    input: AuthLoginDto,
  ): Promise<SignInDataResponseDto | null> {
    const user = await this.usersService.findByEmail(input.email);
    if (user && user.password === input.password) {
      return { userId: user.id, email: user.email };
    }
    return null;
  }

  /**
   *  Sign in
   * @param user
   * @returns
   */
  async signIn(user: User): Promise<AuthResponseDto> {
    const payload = { username: user.email, email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      userId: user.id,
      email: user.email,
    };
  }

  /**
   *  Register
   * @param input
   * @returns
   */
  async register(input: AuthRegisterDto): Promise<AuthResponseDto> {
    const userDate: CreateUserDto = {
      email: input.email,
      password: input.password,
      name: input.name,
      role: 'USER',
      hasOtherPets: false,
    };
    const user = await this.usersService.create(userDate);
    return {
      accessToken: this.jwtService.sign({ userId: user.id, email: user.email }),
      userId: user.id,
      email: user.email,
    };
  }
}
