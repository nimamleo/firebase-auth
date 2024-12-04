import { IBlogDatabaseProvider } from '../../infrastructure/database/provider/blog.provider';
import { IBlog, IBlogEntity } from '../../models/blog.model';
import { Result } from '../../common/result';
import { IAsset } from '../../models/asset.model';
import { IStorageProvider } from '../../infrastructure/storage/provider/storage.provider';
import { ILimitation } from '../../common/pagination/limitation.interface';
import { IPaginatedResult } from '../../common/pagination/paginated-result.interface';
import { BlogEntity } from '../../infrastructure/database/pgsql/entities/blog.entity';
export declare class BlogService {
    private readonly blogDatabaseProvider;
    private readonly assetService;
    constructor(blogDatabaseProvider: IBlogDatabaseProvider, assetService: IStorageProvider);
    createBlog(iBlog: IBlog, iAsset: IAsset): Promise<Result<IBlogEntity>>;
    getBlogById(id: string): Promise<Result<IBlogEntity>>;
    getBlogList(limitation: ILimitation): Promise<Result<IPaginatedResult<IBlogEntity>>>;
    updateBlog(iBlogEntity: Partial<BlogEntity>, iAsset: IAsset): Promise<Result<boolean>>;
    deleteBlog(id: string): Promise<Result<boolean>>;
}
