import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProyectsService } from './proyects.service';
import { Status } from '../common/enum';
import { CreateProyectInputDto } from './dtos/request/create-proyect-input.dto';

describe('ProyectsService', () => {
  let service: ProyectsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectsService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<ProyectsService>(ProyectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await prismaService.clearDatabase();
    await prismaService.$disconnect();
  });

  describe('Create a Product', () => {
    it('should return a product created', async () => {
      const params: CreateProyectInputDto = {
        name: 'local business',
        startDate: new Date(),
        status: Status.done,
      };
      const result = await service.create(params);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('uuid', result.uuid);
      expect(result).toHaveProperty('status', params.status);
      expect(result).toHaveProperty('name', params.name);
    });
  });
});
