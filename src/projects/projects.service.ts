import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { UpdateProjectInputDto } from './dtos/request/update-project-input';
import { ProjectDto } from './dtos/response/project.dto';
import { TechDto } from './dtos/response/tech.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateProjectInputDto): Promise<ProjectDto> {
    //input.startDate = new Date();
    const project = await this.prismaService.project.create({ data: input });
    const techs = await this.getTechs(project.uuid);

    console.log(techs);

    return plainToInstance(ProjectDto, {
      ...project,
      techs,
    });
  }

  async update(
    uuid: string,
    input: UpdateProjectInputDto,
  ): Promise<ProjectDto> {
    const project = await this.prismaService.project.update({
      data: input,
      where: {
        uuid,
      },
    });

    const techs = await this.getTechs(project.uuid);

    console.log(techs);

    return plainToInstance(ProjectDto, {
      ...project,
      techs,
    });
  }

  async addTech(techUuid: string, projectUuid: string): Promise<boolean> {
    const techInProject = await this.prismaService.techInProject.create({
      data: {
        projectUuid,
        techUuid,
      },
    });

    return !(techInProject === null);
  }

  async getTechs(projectUuid: string): Promise<TechDto[]> {
    const techs = await this.prismaService.tech.findMany({
      where: {
        techInProjects: {
          some: {
            projectUuid,
          },
        },
      },
    });

    return plainToInstance(TechDto, techs);
  }

  /*
findAll() {
  return `This action returns all proyects`;
}

findOne(id: number) {
  return `This action returns a #${id} proyect`;
}


remove(id: number) {
  return `This action removes a #${id} proyect`;
}
*/
}
