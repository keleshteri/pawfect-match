import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Login
   * @returns
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: AuthLoginDto) {
    return this.authService.authenticate(input);
  }
  //register

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() input: AuthRegisterDto) {
    return this.authService.register(input);
  }
}
