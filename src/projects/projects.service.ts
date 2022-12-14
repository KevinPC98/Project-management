import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { UpdateProjectInputDto } from './dtos/request/update-project-input';
import { ProjectDto } from './dtos/response/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateProjectInputDto): Promise<ProjectDto> {
    //input.startDate = new Date();
    const proyect = await this.prismaService.project.create({ data: input });
    return plainToInstance(ProjectDto, proyect);
  }

  async update(
    uuid: string,
    input: UpdateProjectInputDto,
  ): Promise<ProjectDto> {
    const proyect = await this.prismaService.project.update({
      data: input,
      where: {
        uuid,
      },
    });
    return plainToInstance(ProjectDto, proyect);
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
