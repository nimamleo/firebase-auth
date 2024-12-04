import { IStorageProvider } from '../provider/storage.provider';
import { Result } from '../../../common/result';
import { IAsset } from '../../../models/asset.model';
export declare class DiskStorageService implements IStorageProvider {
    createFile(iAsset: IAsset): Promise<Result<IAsset>>;
    deleteFile(filePath: string): Promise<Result<boolean>>;
    serveFile(filePath: string): Promise<Result<Buffer>>;
}
