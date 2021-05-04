import { Inject, Injectable } from '@nestjs/common';
import { MOVIES_REPOSITORY } from '../core/constants/constants';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY) private readonly moviesRepository: typeof Movie,
  ) {}

  async create(createMovieDto: CreateMovieDto, uri: string) {
    return await this.moviesRepository.create({ ...createMovieDto, uri });
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.findAll();
  }

  async paginate(page, limit): Promise<Movie[]> {
    const offsets = parseInt(limit) * (parseInt(page) - 1);
    const limits = parseInt(limit);

    const paginationMovie = await this.moviesRepository.findAll({
      limit: limits,
      offset: offsets,
      where: { status: 'activated' },
    });

    return Object({
      ...paginationMovie,
      page: parseInt(page),
      limit: limits,
      offset: offsets,
    });
  }

  async findOne(id: number): Promise<Movie> {
    return await this.moviesRepository.findOne({
      where: { id, status: 'activated' },
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

  async desactivatedMovies(status: string, id: number) {
    const statusMovie = await this.moviesRepository.update(
      { status },
      { where: { id }, returning: true },
    );
    if (statusMovie) {
      return await this.moviesRepository.findOne({ where: { id } });
    }
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
