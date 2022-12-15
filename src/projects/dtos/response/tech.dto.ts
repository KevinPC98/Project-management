import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TechDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;
}
