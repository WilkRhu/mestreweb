import { IsDate, IsString } from 'class-validator';

export class MovieDto {
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly dateInitial: string;

  @IsDate()
  readonly finalDate: string;
}
