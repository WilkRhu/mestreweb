import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '../core/constants/constants';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule {}
