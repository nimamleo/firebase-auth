import { Injectable } from '@nestjs/common';
import { IBlogDatabaseProvider } from '../../provider/blog.provider';
import { IBlog, IBlogEntity } from '../../../../models/blog.model';
import { Err, Ok, Result } from '../../../../common/result';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../entities/blog.entity';
import { Repository } from 'typeorm';
import { HandleError } from '../../../../common/decorators/handle-error.decorator';
import { GenericStatusCodes } from '../../../../common/enums/status.enum';
import { ILimitation } from '../../../../common/pagination/limitation.interface';

@Injectable()
export class BlogPgsqlService implements IBlogDatabaseProvider {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  @HandleError
  async createBlog(iBlog: IBlog): Promise<Result<IBlogEntity>> {
    const newData = BlogEntity.fromIBlog(iBlog);
    const res = await this.blogRepository.save(newData);
    if (!res) {
      return Err('something went wrong', GenericStatusCodes.INTERNAL);
    }

    return Ok(BlogEntity.toIBlogEntity(res));
  }

  @HandleError
  async getBlogById(id: string): Promise<Result<IBlogEntity>> {
    const res = await this.blogRepository
      .createQueryBuilder('b')
      .where('b.id = :id', { id: id })
      .getOne();

    if (!res) {
      return Err('blog not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(BlogEntity.toIBlogEntity(res));
  }

  @HandleError
  async getBlogList(
    limitation: ILimitation,
  ): Promise<Result<[IBlogEntity[], number]>> {
    const [res, count] = await this.blogRepository
      .createQueryBuilder('b')
      .offset(limitation.skip)
      .limit(limitation.limit)
      .getManyAndCount();

    return Ok([res.map((x) => BlogEntity.toIBlogEntity(x)), count]);
  }

  @HandleError
  async updateBlog(iBlogEntity: Partial<BlogEntity>): Promise<Result<boolean>> {
    const res = await this.blogRepository.update(iBlogEntity.id, iBlogEntity);
    if (res.affected === 0) {
      return Err('something went wrong');
    }

    return Ok(res.affected > 0);
  }

  @HandleError
  async deleteBlog(id: string): Promise<Result<boolean>> {
    const res = await this.blogRepository.delete(id);
    if (res.affected === 0) {
      return Err('something went wrong');
    }

    return Ok(res.affected > 0);
  }
}
