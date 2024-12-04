import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterRequest, RegisterResponse } from './models/register.model';
import { AuthService } from '../../../../application/services/auth.service';
import { Role } from '../../../../enum/role.enum';
import { Response } from 'express';
import { Ok } from '../../../../common/result';
import { LoginRequest } from './models/login.model';

@Controller('auth')
@UsePipes(new ValidationPipe())
@ApiTags('AUTH')
export class AuthHttpController extends AbstractHttpController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('register')
  @ApiBody({ type: RegisterRequest })
  async register(@Res() response: Response, @Body() body: RegisterRequest) {
    const res = await this.authService.register({
      email: body.email,
      password: body.password,
      role: Role.USER,
      firstName: body.firstName,
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(response, Ok<RegisterResponse>({ token: res.value }));
  }

  @Post('login')
  @ApiBody({ type: LoginRequest })
  async login(@Res() response: Response, @Body() body: LoginRequest) {
    const res = await this.authService.login({
      email: body.email,
      password: body.password,
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(response, Ok<RegisterResponse>({ token: res.value }));
  }
}
