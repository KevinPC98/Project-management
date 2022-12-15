import { Exclude, Expose } from 'class-transformer';
import { TechDto } from './tech.dto';

@Exclude()
export class ProjectDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  status: string;

  @Expose()
  techs: TechDto[];
}
