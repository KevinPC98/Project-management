import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectInputDto } from './dtos/request/create-project-input.dto';
import { UpdateProjectInputDto } from './dtos/request/update-project-input';
import { ProjectDto } from './dtos/response/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('/create')
  create(@Body() input: CreateProjectInputDto): Promise<ProjectDto> {
    return this.projectsService.create(input);
  }

  @Patch('/update/:uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateProjectInputDto: UpdateProjectInputDto,
  ): Promise<ProjectDto> {
    return this.projectsService.update(uuid, updateProjectInputDto);
  }

  @Post('/update/:techUuid/:projectUuid')
  addTech(
    @Param('techUuid') techUuid: string,
    @Param('projectUuid') projectUuid: string,
  ): Promise<boolean> {
    return this.projectsService.addTech(techUuid, projectUuid);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectsService.remove(+id);
  }
  */
}
