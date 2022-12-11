import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProyectInputDto } from './dtos/request/create-proyect-input.dto';
import { ProyectDto } from './dtos/response/proyect.dto';

@Injectable()
export class ProyectsService {
  constructor(private prismaService: PrismaService) {}

  async create(input: CreateProyectInputDto): Promise<ProyectDto> {
    //input.startDate = new Date();
    const proyect = await this.prismaService.proyect.create({ data: input });
    return plainToInstance(ProyectDto, proyect);
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
