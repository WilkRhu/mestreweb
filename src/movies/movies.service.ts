import { Inject, Injectable } from '@nestjs/common';
import { MOVIES_REPOSITORY } from 'src/core/constants/constants';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY) private readonly moviesRepository: typeof Movie,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.moviesRepository.create(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.findAll();
  }

  async findOne(id: number): Promise<Movie> {
    return await this.moviesRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const findUse = await this.moviesRepository.findOne({ where: { id } });
    if (findUse) {
      await this.moviesRepository.update(
        { ...updateMovieDto },
        { where: { id }, returning: true },
      );

      const findUseNew = await this.moviesRepository.findOne({ where: { id } });

      return findUseNew;
    }
    return {
      status: 404,
      message: 'Movie Not Found!',
    };
  }

  async remove(id: number) {
    const findUse = await this.moviesRepository.findOne({ where: { id } });
    if (findUse) {
      await this.moviesRepository.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Movie Deleted Success',
      };
    }
    return {
      status: 404,
      message: 'Movie Not Found!',
    };
  }
}
