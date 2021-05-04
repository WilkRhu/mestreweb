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
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuardTotal } from '../auth/guards/role-total.guard';
import { Roles } from '../core/decorator/role.decorator';
import { Role } from '../core/enum/role.enum';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const url = process.env.URI_FILE;
let nameFile;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@UseGuards(JwtAuthGuard, RolesGuardTotal)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(Role.ADM)
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: multerS3({
        s3: s3,
        bucket: AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (request, file, cb) {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
          nameFile = `${Date.now().toString()}-${file.originalname}`;
        },
      }),
    }),
  )
  @Post()
  create(@Request() req, uri: string) {
    return this.moviesService.create(req.body, (uri = url + nameFile));
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
