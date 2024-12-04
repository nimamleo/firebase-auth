import { Inject, Injectable } from '@nestjs/common';
import {
  BLOG_DATABASE_PROVIDER,
  IBlogDatabaseProvider,
} from '../../infrastructure/database/provider/blog.provider';
import { IBlog, IBlogEntity } from '../../models/blog.model';
import { Err, Ok, Result } from '../../common/result';
import { HandleError } from '../../common/decorators/handle-error.decorator';
import { IAsset } from '../../models/asset.model';
import {
  ASSET_STORAGE_PROVIDER,
  IStorageProvider,
} from '../../infrastructure/storage/provider/storage.provider';
import { ILimitation } from '../../common/pagination/limitation.interface';
import { IPaginatedResult } from '../../common/pagination/paginated-result.interface';
import { PaginationResult } from '../../common/pagination/paginatio-result';
import { BlogEntity } from '../../infrastructure/database/pgsql/entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @Inject(BLOG_DATABASE_PROVIDER)
    private readonly blogDatabaseProvider: IBlogDatabaseProvider,
    @Inject(ASSET_STORAGE_PROVIDER)
    private readonly assetService: IStorageProvider,
  ) {}

  @HandleError
  async createBlog(iBlog: IBlog, iAsset: IAsset): Promise<Result<IBlogEntity>> {
    const uploadImage = await this.assetService.createFile(iAsset);
    if (uploadImage.isError()) {
      return Err(uploadImage.err);
    }

    const createBlog = await this.blogDatabaseProvider.createBlog({
      content: iBlog.content,
      title: iBlog.title,
      image: uploadImage.value.directoryPath,
    });
    if (createBlog.isError()) {
      await this.assetService.deleteFile(uploadImage.value.directoryPath);
      return Err(createBlog.err);
    }

    return Ok(createBlog.value);
  }

  @HandleError
  async getBlogById(id: string): Promise<Result<IBlogEntity>> {
    const res = await this.blogDatabaseProvider.getBlogById(id);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async getBlogList(
    limitation: ILimitation,
  ): Promise<Result<IPaginatedResult<IBlogEntity>>> {
    const res = await this.blogDatabaseProvider.getBlogList(limitation);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(new PaginationResult(res.value[0], res.value[1], limitation));
  }

  @HandleError
  async updateBlog(
    iBlogEntity: Partial<BlogEntity>,
    iAsset: IAsset,
  ): Promise<Result<boolean>> {
    const getBlog = await this.blogDatabaseProvider.getBlogById(
      iBlogEntity.id.toString(),
    );
    if (getBlog.isError()) {
      return Err(getBlog.err);
    }
    if (iAsset && iAsset.buffer) {
      const deleteImage = await this.assetService.deleteFile(
        getBlog.value.image,
      );
      if (deleteImage.isError()) {
        return Err(deleteImage.err);
      }
      const createImage = await this.assetService.createFile(iAsset);
      if (createImage.isError()) {
        return Err(createImage.err);
      }

      iBlogEntity.image = createImage.value.directoryPath;
    }

    const res = await this.blogDatabaseProvider.updateBlog(iBlogEntity);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async deleteBlog(id: string): Promise<Result<boolean>> {
    const getBlog = await this.blogDatabaseProvider.getBlogById(id);
    if (getBlog.isError()) {
      return Err(getBlog.err);
    }
    const res = await this.blogDatabaseProvider.deleteBlog(id);
    if (res.isError()) {
      return Err(res.err);
    }

    const removeImage = await this.assetService.deleteFile(getBlog.value.image);
    if (removeImage.isError()) {
      await this.blogDatabaseProvider.createBlog(getBlog.value);
      return Err(removeImage.err);
    }

    return Ok(res.value);
  }
}
