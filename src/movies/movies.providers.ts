import { MOVIES_REPOSITORY } from '../core/constants/constants';
import { Movie } from './entities/movie.entity';

export const moviesProvider = [
  {
    provide: MOVIES_REPOSITORY,
    useValue: Movie,
  },
];
