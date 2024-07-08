import { Module } from '@nestjs/common';
import { PuppiesService } from './puppies.service';
import { PuppiesController } from './puppies.controller';
import { PuppiesMapperService } from './puppies.mapper.service';

@Module({
  providers: [PuppiesService, PuppiesMapperService],
  controllers: [PuppiesController],
})
export class PuppiesModule {}
