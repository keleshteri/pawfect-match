import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * AuthModule
 */
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('AUTH_JWT_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          subject: configService.get<string>('AUTH_JWT_SUBJECT'),
          expiresIn: configService.get<string>(
            'AUTH_JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AuthModule {}
