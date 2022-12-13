import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from './projects.service';
import { Status } from '../common/enum';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { UpdateProjectInputDto } from './dtos/request/update-project-input';
import { ProjectFactory } from '../common/project.factory';
import { Project } from '@prisma/client';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prismaService: PrismaService;
  let projectFactory: ProjectFactory;
  let project: Project;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<ProjectsService>(ProjectsService);
    projectFactory = new ProjectFactory(prismaService);

    project = await projectFactory.make({});
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

  describe('Update a Product', () => {
    it('should return a product updated', async () => {
      const params: UpdateProjectInputDto = {
        name: 'new name',
        startDate: new Date(),
        status: Status.archived,
      };
      const result = await service.update(project.uuid, params);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('uuid', result.uuid);
      expect(result).toHaveProperty('status', params.status);
      expect(result).toHaveProperty('name', params.name);
    });
  });
});
