import { Module } from '@nestjs/common';
import { ASSET_STORAGE_PROVIDER } from './provider/storage.provider';
import { DiskStorageService } from './disk/disk-storage.service';

@Module({
  providers: [
    {
      provide: ASSET_STORAGE_PROVIDER,
      useClass: DiskStorageService,
    },
  ],
  exports: [ASSET_STORAGE_PROVIDER],
})
export class StorageModule {}
