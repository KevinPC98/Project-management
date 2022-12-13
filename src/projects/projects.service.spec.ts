import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from './projects.service';
import { Status } from '../common/enum';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<ProjectsService>(ProjectsService);
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
      const params: CreateProjectInputDto = {
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
