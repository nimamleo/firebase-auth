import { IBlog, IBlogEntity } from '../../../models/blog.model';
import { Result } from '../../../common/result';
import { ILimitation } from '../../../common/pagination/limitation.interface';
import { BlogEntity } from '../pgsql/entities/blog.entity';
export interface IBlogReader {
    getBlogById(id: string): Promise<Result<IBlogEntity>>;
    getBlogList(limitation: ILimitation): Promise<Result<[IBlogEntity[], number]>>;
}
export interface IBlogWriter {
    createBlog(iBlog: IBlog): Promise<Result<IBlogEntity>>;
    updateBlog(iBlogEntity: Partial<BlogEntity>): Promise<Result<boolean>>;
    deleteBlog(id: string): Promise<Result<boolean>>;
}
export interface IBlogDatabaseProvider extends IBlogReader, IBlogWriter {
}
export declare const BLOG_DATABASE_PROVIDER = "blog-database-provider";
