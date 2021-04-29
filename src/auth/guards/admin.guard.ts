import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class AdminGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    return user;
  }
}
