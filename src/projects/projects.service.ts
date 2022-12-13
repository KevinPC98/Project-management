import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { ProjectDto } from './dtos/response/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateProjectInputDto): Promise<ProjectDto> {
    //input.startDate = new Date();
    const proyect = await this.prismaService.proyect.create({ data: input });
    return plainToInstance(ProjectDto, proyect);
  }
  /*
findAll() {
  return `This action returns all proyects`;
}

findOne(id: number) {
  return `This action returns a #${id} proyect`;
}

update(id: number, updateProyectDto: UpdateProyectDto) {
  return `This action updates a #${id} proyect`;
}

remove(id: number) {
  return `This action removes a #${id} proyect`;
}
*/
}
