import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service that provides access to the Prisma client.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Initializes the Prisma service when the module is initialized.
   * Connects to the database.
   */
  async onModuleInit() {
    this.$connect()
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((e) => {
        console.error('Unable to connect to the database:', e);
      });
  }

  /**
   * Cleans up the Prisma service when the module is destroyed.
   * Disconnects from the database.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
