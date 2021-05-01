import { IsString } from 'class-validator';

export class CreateMovieDto {
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly dateInitial: string;

  @IsString()
  readonly finalDate: string;

  @IsString()
  readonly status: string;
}
