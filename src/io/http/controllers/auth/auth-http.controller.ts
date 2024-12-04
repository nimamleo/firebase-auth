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
import { RegisterRequest } from './models/register.model';
import { AuthService } from '../../../../application/services/auth.service';
import { Role } from '../../../../enum/role.enum';

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
  }
}
