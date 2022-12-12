import { Body, Controller, Post } from '@nestjs/common';
import { CreateProyectInputDto } from './dtos/request/create-proyect-input.dto';
import { ProyectDto } from './dtos/response/proyect.dto';
import { ProyectsService } from './proyects.service';

@Controller('proyects')
export class ProyectsController {
  constructor(private readonly proyectsService: ProyectsService) {}

  @Post('/create')
  create(@Body() input: CreateProyectInputDto): Promise<ProyectDto> {
    return this.proyectsService.create(input);
  }

  /*
  @Get()
  findAll() {
    return this.proyectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectDto: UpdateProyectDto) {
    return this.proyectsService.update(+id, updateProyectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectsService.remove(+id);
  }
  */
}
