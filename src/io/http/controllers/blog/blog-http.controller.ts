import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from '../../../../enum/role.enum';
import { RBAC } from '../../decorators/rbac.decorator';
import { AuthGuard } from '../../guard/auth.guard';
import { RBACGuard } from '../../guard/rbac.guard';
import { Err, Ok } from '../../../../common/result';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateBlogRequest,
  CreateBlogResponse,
} from './models/create-blog.model';
import { BlogService } from '../../../../application/services/blog.service';
import { GetBlogResponse } from './models/get-blog.model';
import { Pagination } from '../../../../common/pagination/pagination.model';
import { IPaginatedResult } from '../../../../common/pagination/paginated-result.interface';
import { GetBlogListResponse } from './models/get-blog-list.model';
import {
  DeleteBlogRequest,
  DeleteBlogResponse,
} from './models/delete-blog.model';
import {
  UpdateBlogRequest,
  UpdateBlogResponse,
} from './models/update-blog.model';

@Controller('blog')
@UsePipes(new ValidationPipe())
@ApiTags('BLOG')
@UseGuards(AuthGuard, RBACGuard)
@ApiBearerAuth()
export class BlogHttpController extends AbstractHttpController {
  constructor(private readonly blogService: BlogService) {
    super();
  }

  @Post()
  @RBAC(Role.USER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateBlogRequest,
  })
  async createBlog(
    @Res() response: Response,
    @Body() body: CreateBlogRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file && file.size > 2 * 1024 * 1024) {
      this.sendResult(response, Err('file size should not be more than 2MB'));
    }
    if (file && !['image/png', 'image/jpeg'].includes(file.mimetype)) {
      this.sendResult(response, Err('file type can be png or jpeg'));
    }
    const res = await this.blogService.createBlog(
      { image: null, title: body.title, content: body.content },
      {
        mimetype: file.mimetype,
        directoryPath: null,
        buffer: file.buffer,
        size: file.size,
        name: file.originalname,
      },
    );
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }
    this.sendResult(
      response,
      Ok<CreateBlogResponse>({
        id: res.value.id,
        title: res.value.title,
        content: res.value.content,
        image: res.value.image,
      }),
    );
  }

  @Get(':id')
  @RBAC(Role.USER)
  async getBlogById(
    @Res() response: Response,
    @Query('blogId') blogId: string,
  ) {
    const res = await this.blogService.getBlogById(blogId);
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }
    this.sendResult(
      response,
      Ok<GetBlogResponse>({
        id: res.value.id,
        title: res.value.title,
        content: res.value.content,
        image: res.value.image,
      }),
    );
  }

  @Get()
  @RBAC(Role.USER)
  async getBlogList(@Res() response: Response, @Query('page') page: number) {
    const pagination = new Pagination(page);

    const res = await this.blogService.getBlogList({
      skip: pagination.getSkip(),
      limit: pagination.getLimit(),
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<IPaginatedResult<GetBlogListResponse>>({
        list: res.value.list,
        total: res.value.total,
        page: res.value.page,
        pageSize: res.value.pageSize,
      }),
    );
  }

  @Delete(':id')
  @RBAC(Role.USER)
  async deleteBlog(@Res() response: Response, @Query('blogId') blogId: string) {
    const res = await this.blogService.deleteBlog(blogId);
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(response, Ok<DeleteBlogResponse>({ success: res.value }));
  }

  @Patch(':id')
  @RBAC(Role.USER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateBlogRequest,
  })
  async updateBlog(
    @Res() response: Response,
    @Body() body: UpdateBlogRequest,
    @Query('blogId') blogId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file && file.size > 2 * 1024 * 1024) {
      this.sendResult(response, Err('file size should not be more than 2MB'));
    }
    if (file && !['image/png', 'image/jpeg'].includes(file.mimetype)) {
      this.sendResult(response, Err('file type can be png or jpeg'));
    }
    const res = await this.blogService.updateBlog(
      {
        id: +blogId,
        title: body.title,
        content: body.content,
      },
      file
        ? {
            name: file.originalname,
            directoryPath: null,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer,
          }
        : null,
    );
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    return this.sendResult(response, Ok<UpdateBlogResponse>({ success: true }));
  }
}
