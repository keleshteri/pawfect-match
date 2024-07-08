import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PuppiesModule } from './modules/puppies/puppies.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './modules/common/common.module';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { BreedsModule } from './modules/breeds/breeds.module';
import { AdoptionApplicationModule } from './modules/adoption-application/adoption-application.module';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot(),
    PrismaModule,
    PuppiesModule,
    UsersModule,
    CommonModule,
    BreedsModule,
    AdoptionApplicationModule,
  ],
})
export class AppModule {}
