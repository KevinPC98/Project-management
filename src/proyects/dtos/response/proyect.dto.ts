import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProyectDto {
  @Expose()
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  status: string;
}
