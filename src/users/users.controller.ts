import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../core/decorator/role.decorator';
import { Role } from '../core/enum/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADM, Role.AL, Role.EDT)
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Patch(':uuid')
  @Roles(Role.ADM, Role.AL, Role.EDT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Roles(Role.ADM, Role.AL, Role.EDT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
