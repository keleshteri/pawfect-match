import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

/**
 * Unit tests for the Prisma service.
 */
describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        // {
        //   provide: PrismaService,
        //   useValue: {
        //     $connect: jest.fn().mockResolvedValue(undefined),
        //     $disconnect: jest.fn().mockResolvedValue(undefined),
        //     onModuleInit: jest.fn().mockResolvedValue(undefined),
        //     onModuleDestroy: jest.fn().mockResolvedValue(undefined),
        //   },
        // },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    jest.spyOn(prismaService, '$connect').mockResolvedValue(undefined);
    jest.spyOn(prismaService, '$disconnect').mockResolvedValue(undefined);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should connect to the database on module initialization', async () => {
    await prismaService.onModuleInit();
    expect(prismaService.$connect).toHaveBeenCalled();
  });

  it('should disconnect from the database on module destruction', async () => {
    await prismaService.onModuleDestroy();
    expect(prismaService.$disconnect).toHaveBeenCalled();
  });
});
