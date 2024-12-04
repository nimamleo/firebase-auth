import { IBlogDatabaseProvider } from '../../provider/blog.provider';
import { IBlog, IBlogEntity } from '../../../../models/blog.model';
import { Result } from '../../../../common/result';
import { BlogEntity } from '../entities/blog.entity';
import { Repository } from 'typeorm';
import { ILimitation } from '../../../../common/pagination/limitation.interface';
export declare class BlogPgsqlService implements IBlogDatabaseProvider {
    private readonly blogRepository;
    constructor(blogRepository: Repository<BlogEntity>);
    createBlog(iBlog: IBlog): Promise<Result<IBlogEntity>>;
    getBlogById(id: string): Promise<Result<IBlogEntity>>;
    getBlogList(limitation: ILimitation): Promise<Result<[IBlogEntity[], number]>>;
    updateBlog(iBlogEntity: Partial<BlogEntity>): Promise<Result<boolean>>;
    deleteBlog(id: string): Promise<Result<boolean>>;
}
