import { Injectable } from '@nestjs/common';
import { IStorageProvider } from '../provider/storage.provider';
import * as Buffer from 'node:buffer';
import { Err, Ok, Result } from '../../../common/result';
import { HandleError } from '../../../common/decorators/handle-error.decorator';
import { GenericError } from '../../../common/error/generic-error.model';
import * as fs from 'fs';
import * as path from 'path';
import { IAsset } from '../../../models/asset.model';

@Injectable()
export class DiskStorageService implements IStorageProvider {
  @HandleError
  async createFile(iAsset: IAsset): Promise<Result<IAsset>> {
    iAsset.directoryPath = path.join(__dirname, '../../../../../images');
    iAsset.directoryPath = path.join(
      iAsset.directoryPath,
      `${Date.now()}-${iAsset.name.trim()}`,
    );

    const res = await new Promise<boolean>((resolve, reject) => {
      fs.writeFile(iAsset.directoryPath, iAsset.buffer, (err) => {
        if (err) {
          reject(new GenericError(err));
          return;
        }

        resolve(true);
      });
    });
    return Ok({
      name: iAsset.name,
      buffer: null,
      mimetype: iAsset.mimetype,
      directoryPath: iAsset.directoryPath,
      size: iAsset.size,
    });
  }

  @HandleError
  async deleteFile(filePath: string): Promise<Result<boolean>> {
    const res = await new Promise<boolean>((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(new GenericError(err));
          return;
        }

        resolve(true);
      });
    });
    return Ok(res);
  }
  serveFile(filePath: string): Promise<Result<Buffer>> {
    throw new Error('no');
  }
}
