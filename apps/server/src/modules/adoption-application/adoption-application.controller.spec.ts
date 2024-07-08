import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionApplicationController } from './adoption-application.controller';

describe('AdoptionApplicationController', () => {
  let controller: AdoptionApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdoptionApplicationController],
    }).compile();

    controller = module.get<AdoptionApplicationController>(AdoptionApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
