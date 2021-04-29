import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(uuid: string): Promise<User> {
    return await this.userRepository.findOne({ where: { uuid } });
  }

  // async update(
  //   uuid: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UpdateUserDto> {
  //   return await this.userRepository.update(
  //     { updateUserDto },
  //     { where: { uuid } },
  //   );
  // }

  async remove(uuid: string) {
    return await this.userRepository.destroy<User>({ where: { uuid } });
  }
}
