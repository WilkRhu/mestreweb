import { Module } from '@nestjs/common';
import { MOVIES_REPOSITORY } from '../core/constants/constants';
import { MoviesController } from './movies.controller';
import { moviesProvider } from './movies.providers';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, ...moviesProvider],
  exports: [MoviesService, MOVIES_REPOSITORY],
})
export class MoviesModule {}
