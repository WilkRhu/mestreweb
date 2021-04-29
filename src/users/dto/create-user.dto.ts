import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from 'src/core/enum/role.enum';
import { Status } from 'src/core/enum/status.enum';

export class CreateUserDto {
  readonly uuid: string;

  @IsString()
  @Length(1, 100)
  readonly name: string;

  @IsEmail()
  @Length(1, 25)
  readonly email: string;

  @IsString()
  @Length(1, 8)
  readonly password: string;

  @IsEnum(Role)
  readonly role: string;

  @IsEnum(Status)
  readonly status: string;
}
