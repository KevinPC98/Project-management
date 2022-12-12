import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProyectDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  status: string;
}
