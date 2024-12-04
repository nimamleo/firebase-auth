import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { AuthService } from './services/auth.service';
import { FirebaseModule } from '../infrastructure/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { BlogService } from './services/blog.service';
import { StorageModule } from '../infrastructure/storage/storage.module';

@Module({
  imports: [DatabaseModule, FirebaseModule, ConfigModule, StorageModule],
  providers: [AuthService, BlogService],
  exports: [AuthService, BlogService],
})
export class ApplicationModule {}
