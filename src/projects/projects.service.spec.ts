import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from './projects.service';
import { Status } from '../common/enum';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { UpdateProjectInputDto } from './dtos/request/update-project-input';
import { ProjectFactory } from '../common/project.factory';
import { Project, Tech, TechInProject } from '@prisma/client';
import { TechFactory } from '../common/tech.factory';
import { TechInProjectFactory } from '../common/techs-in-project.factory';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prismaService: PrismaService;
  let projectFactory: ProjectFactory;
  let techFactory: TechFactory;
  let techInProjectFactory: TechInProjectFactory;
  let project: Project;
  let techs: Tech[];
  let techInProject: TechInProject;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<ProjectsService>(ProjectsService);
    projectFactory = new ProjectFactory(prismaService);
    techFactory = new TechFactory(prismaService);
    techInProjectFactory = new TechInProjectFactory(prismaService);

    project = await projectFactory.make({});
    techs = await techFactory.makeMany(5, {});
    techInProject = await techInProjectFactory.make({
      project: {
        connect: {
          uuid: project.uuid,
        },
      },
      tech: {
        connect: {
          uuid: techs[0].uuid,
        },
      },
    });

    console.log(techInProject);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await prismaService.clearDatabase();
    await prismaService.$disconnect();
  });

  describe('Create a project', () => {
    it('should return a project created', async () => {
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

  describe('Update a project', () => {
    it('should return a project updated', async () => {
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

  describe('Add tech in project', () => {
    it('should return true when add a tech in the project requested', async () => {
      expect(await service.addTech(techs[0].uuid, project.uuid)).toBeTruthy();
    });
  });

  describe('Get list of techs by projects', () => {
    it('should return the list of techs', async () => {
      const result = await service.getTechs(project.uuid);
      expect(result[0]).toHaveProperty('uuid', techs[0].uuid);
      expect(result[0]).toHaveProperty('name', techs[0].name);
    });
  });
});
