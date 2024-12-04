import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './service/firebase.service';

export const FIREBASE_PROVIDER = 'firebase-provider';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
