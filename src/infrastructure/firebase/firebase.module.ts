import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';
import {
  FIREBASE_CONFIG_TOKEN,
  IFirebaseConfig,
} from './config/firebase.config';
import { FirebaseService } from './service/firebase.service';

export const FIREBASE_PROVIDER = 'firebase-provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: FIREBASE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const firebaseConfig: IFirebaseConfig = configService.get(
          FIREBASE_CONFIG_TOKEN,
        );
        firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert({
            privateKey: firebaseConfig.privateKey,
            projectId: firebaseConfig.projectId,
            clientEmail: firebaseConfig.clientEmail,
          }),
        });
      },
    },
    FirebaseService,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
