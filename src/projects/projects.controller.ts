import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { ProjectDto } from './dtos/response/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('/create')
  create(@Body() input: CreateProjectInputDto): Promise<ProjectDto> {
    return this.projectsService.create(input);
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
