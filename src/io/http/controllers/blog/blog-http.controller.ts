import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from '../../../../enum/role.enum';
import { RBAC } from '../../decorators/rbac.decorator';
import { AuthGuard } from '../../guard/auth.guard';
import { RBACGuard } from '../../guard/rbac.guard';
import { Ok } from '../../../../common/result';

@Controller('blog')
@UsePipes(new ValidationPipe())
@ApiTags('BLOG')
@UseGuards(AuthGuard, RBACGuard)
@ApiBearerAuth()
export class BlogHttpController extends AbstractHttpController {
  constructor() {
    super();
  }

  @Post('')
  @RBAC(Role.USER)
  // @ApiBody({ type: RegisterRequest })
  async createBlog(@Res() response: Response, @Body() body: any) {
    this.sendResult(response, Ok(true));
  }
}
