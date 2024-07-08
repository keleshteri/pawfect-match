import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Module for the Prisma service.
 * Global to make the Prisma service available to the entire application.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
