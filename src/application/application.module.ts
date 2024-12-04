import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { AuthService } from './services/auth.service';
import { FirebaseModule } from '../infrastructure/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, FirebaseModule, ConfigModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApplicationModule {}
