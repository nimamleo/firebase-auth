import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { AuthService } from './services/auth.service';
import { FirebaseService } from '../infrastructure/firebase/service/firebase.service';
import { FirebaseModule } from '../infrastructure/firebase/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApplicationModule {}
