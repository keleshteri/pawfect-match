import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';

@Module({
  providers: [BreedsService],
  controllers: [BreedsController]
})
export class BreedsModule {}
