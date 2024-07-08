import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionApplicationService } from './adoption-application.service';

describe('AdoptionApplicationService', () => {
  let service: AdoptionApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoptionApplicationService],
    }).compile();

    service = module.get<AdoptionApplicationService>(AdoptionApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
