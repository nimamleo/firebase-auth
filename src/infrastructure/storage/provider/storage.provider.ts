import { Result } from '../../../common/result';
import { IAsset } from '../../../models/asset.model';

export interface IStorageProvider {
  createFile(iAsset: IAsset): Promise<Result<IAsset>>;

  deleteFile(filePath: string): Promise<Result<boolean>>;

  serveFile(filePath: string): Promise<Result<Buffer>>;
}

export const ASSET_STORAGE_PROVIDER = 'asset-storage-provider';
