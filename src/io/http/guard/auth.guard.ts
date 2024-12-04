import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../../application/services/auth.service';
import { HandleError } from '../../../common/decorators/handle-error.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  @HandleError
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }

    const bearerToken = token.split(' ');
    if (bearerToken[0] !== 'Bearer') {
      return false;
    }

    const getUserIdRes = await this.authService.verifyUser(bearerToken[1]);
    if (getUserIdRes.isError()) {
      return false;
    }

    request['userId'] = getUserIdRes.value;
    request['userRole'] = getUserIdRes.value.role;

    return true;
  }
}
