import { IEntity } from '../common/interfaces/entity.interface';
import { IDated } from '../common/interfaces/dated.interface';

export interface IAsset {
  directoryPath: string;
  name: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export interface IAssetEntity extends IAsset, IEntity, IDated {}
