import { Exclude } from 'class-transformer';
import { Status } from '../../../common/enum';
import { IsDate, IsEnum } from 'class-validator';

@Exclude()
export class UpdateProjectInputDto {
  readonly name: string;

  @IsDate()
  readonly startDate: Date;

  @IsEnum(Status)
  readonly status: string;
}
