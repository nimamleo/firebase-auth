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

@Controller('auth')
@UsePipes(new ValidationPipe())
@ApiTags('AUTH')
export class AuthHttpController extends AbstractHttpController {
  constructor() {
    super();
  }

  @Post('register')
  @ApiBody({ type: RegisterRequest })
  async register(@Res() response: Response, @Body() body: RegisterRequest) {}
}
