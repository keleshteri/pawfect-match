import { Test, TestingModule } from '@nestjs/testing';
import { PuppiesController } from './puppies.controller';
import { PuppiesService } from './puppies.service';
import { PaginationDto } from '../common/dtos';
import { PuppyFilterDto } from './dtos/puppy-filter.dto';
import { PuppyListPaginationDto } from './dtos/puppy-list-pagination.dto';
import { PuppySearchDto } from './dtos/puppy-search.dto';
import { CreatePuppyDto } from './dtos/create-puppy.dto';
import { UpdatePuppyDto } from './dtos/update-puppy.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PuppiesMapperService } from './puppies.mapper.service';

describe('PuppiesController', () => {
  let controller: PuppiesController;
  let service: PuppiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppiesController],
      providers: [PuppiesService, PrismaService, PuppiesMapperService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<PuppiesController>(PuppiesController);
    service = module.get<PuppiesService>(PuppiesService);
  });

  describe('getAllPuppies', () => {
    it('should return a list of puppies', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };
      const puppyFilterDto: PuppyFilterDto = {
        breed: 'German Shepherd',
      };
      const expectedResult: PuppyListPaginationDto = {
        data: [
          {
            id: 1,
            name: 'Samuel',
            age: 1,
            gender: 'male',
            isVaccinated: true,
            isNeutered: true,
            size: 'small',
            breed: 'Jack Russell',
            traits: ['Quiet', 'Great with children'],
            photoUrl:
              'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
        ],
        metadata: {
          currentPage: 1,
          pageCount: 1,
          total: 10,
        },
      };
      jest.spyOn(service, 'getAllPuppies').mockResolvedValue(expectedResult);

      const result = await controller.getAllPuppies(
        paginationDto,
        puppyFilterDto,
      );

      expect(result).toEqual(expectedResult);
      expect(service.getAllPuppies).toHaveBeenCalledWith(
        puppyFilterDto,
        paginationDto,
      );
    });
  });

  describe('getPuppyById', () => {
    it('should return a puppy by id', async () => {
      const id = '1';
      const expectedResult = {
        id: 1,
        name: 'Rex',
        breed: 'German Shepherd',
        age: 2,
        size: 'Large',
        gender: 'Male',
        traits: ['Quiet', 'Great with children'],
        photoUrl:
          'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        healthRecords: [
          {
            neuteredStatus: true,
            medicalNotes: 'Healthy puppy',
            vaccinations: [
              {
                vaccinatedOn: new Date(),
                nextDueDate: new Date(),
                vaccineName: 'Rabies',
              },
            ],
          },
        ],
      };

      jest.spyOn(service, 'getAPuppyById').mockResolvedValue(expectedResult);

      const result = await controller.getPuppyById(id);

      expect(result).toEqual(expectedResult);
      expect(service.getAPuppyById).toHaveBeenCalledWith(+id);
    });
  });

  describe('searchPuppies', () => {
    it('should return a list of puppies matching the search criteria', async () => {
      const searchDto: PuppySearchDto = {
        search: 'German Shepherd',
      };
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };
      const expectedResult: PuppyListPaginationDto = {
        data: [
          {
            id: 1,
            name: 'Samuel',
            age: 1,
            gender: 'male',
            isVaccinated: true,
            isNeutered: true,
            size: 'small',
            breed: 'Jack Russell',
            traits: ['Quiet', 'Great with children'],
            photoUrl:
              'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
        ],
        metadata: {
          currentPage: 1,
          pageCount: 1,
          total: 10,
        },
      };

      jest.spyOn(service, 'searchPuppies').mockResolvedValue(expectedResult);

      const result = await controller.searchPuppies(searchDto, paginationDto);

      expect(result).toEqual(expectedResult);
      expect(service.searchPuppies).toHaveBeenCalledWith(
        searchDto,
        paginationDto,
      );
    });
  });

  describe('createPuppy', () => {
    it('should create a new puppy', async () => {
      const puppyDto: CreatePuppyDto = {
        name: 'Rex',
        breedId: 1,
        age: 2,
        size: 'Large',
        gender: '',
        traitIds: [],
      };
      const expectedResult = {
        id: 9,
        name: 'Fluffy',
        age: 2,
        gender: 'Male',
        size: 'Small',
        breedId: 1,
        photoUrl:
          'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      };

      jest.spyOn(service, 'createPuppy').mockResolvedValue(expectedResult);

      const result = await controller.createPuppy(puppyDto);

      expect(result).toEqual(expectedResult);
      expect(service.createPuppy).toHaveBeenCalledWith(puppyDto);
    });
  });

  describe('updatePuppy', () => {
    it('should update an existing puppy', async () => {
      const id = '1';
      const puppyDto: UpdatePuppyDto = {
        name: 'Rex',
        breedId: 1,
        age: 2,
        size: 'Large',
        gender: '',
        traitIds: [],
      };
      const expectedResult = {
        id: 9,
        name: 'Fluffy',
        age: 2,
        gender: 'Male',
        size: 'Small',
        breedId: 1,
        photoUrl:
          'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      };

      jest.spyOn(service, 'updatePuppy').mockResolvedValue(expectedResult);

      const result = await controller.updatePuppy(id, puppyDto);

      expect(result).toEqual(expectedResult);
      expect(service.updatePuppy).toHaveBeenCalledWith(+id, puppyDto);
    });
  });

  describe('deletePuppy', () => {
    it('should delete a puppy', async () => {
      const id = '9';
      const expectedResult = {
        id: 9,
        name: 'Fluffy',
        age: 2,
        gender: 'Male',
        size: 'Small',
        breedId: 1,
        photoUrl:
          'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      };

      jest.spyOn(service, 'deletePuppy').mockResolvedValue(expectedResult);

      const result = await controller.deletePuppy(id);

      expect(result).toEqual(expectedResult);
      expect(service.deletePuppy).toHaveBeenCalledWith(+id);
    });
  });
});
