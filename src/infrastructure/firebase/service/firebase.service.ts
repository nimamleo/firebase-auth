import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import { ConfigService } from '@nestjs/config';
import {
  FIREBASE_CONFIG_TOKEN,
  IFirebaseConfig,
} from '../config/firebase.config';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: app.App;
  constructor(configService: ConfigService) {
    const firebaseConfig: IFirebaseConfig = configService.get(
      FIREBASE_CONFIG_TOKEN,
    );
    this.firebaseAdmin = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: firebaseConfig.privateKey,
        projectId: firebaseConfig.projectId,
        clientEmail: firebaseConfig.clientEmail,
      }),
    });
  }
}
