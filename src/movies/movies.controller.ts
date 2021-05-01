import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuardTotal } from '../auth/guards/role-total.guard';
import { Roles } from '../core/decorator/role.decorator';
import { Role } from '../core/enum/role.enum';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@UseGuards(JwtAuthGuard, RolesGuardTotal)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(Role.ADM)
  @Post()
  create(@Request() req) {
    return this.moviesService.create(req.body);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Roles(Role.ADM, Role.AL, Role.EDT)
  @Get('/pagination')
  pagination(@Query('page') page: string, @Query('limit') limit: string) {
    return this.moviesService.paginate(page, limit);
  }

  @Roles(Role.ADM, Role.AL, Role.EDT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Roles(Role.ADM)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Roles(Role.ADM)
  @Get('/statusMovies/:id')
  desactivatedMovies(@Query('status') status: string, @Param('id') id: number) {
    return this.moviesService.desactivatedMovies(status, id);
  }

  @Roles(Role.ADM)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
