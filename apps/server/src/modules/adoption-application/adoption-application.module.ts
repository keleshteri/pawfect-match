import { Module } from '@nestjs/common';
import { AdoptionApplicationService } from './adoption-application.service';
import { AdoptionApplicationController } from './adoption-application.controller';

@Module({
  providers: [AdoptionApplicationService],
  controllers: [AdoptionApplicationController]
})
export class AdoptionApplicationModule {}
