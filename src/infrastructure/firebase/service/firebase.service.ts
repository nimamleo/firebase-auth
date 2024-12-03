import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import { ConfigService } from '@nestjs/config';
import {
  FIREBASE_CONFIG_TOKEN,
  IFirebaseConfig,
} from '../config/firebase.config';
import { HandleError } from '../../../common/decorators/handle-error.decorator';
import { IUser } from '../../../models/user.model';

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

  @HandleError
  async createUser(iUser: IUser) {
    const res = await this.firebaseAdmin.auth().createUser({
      displayName: iUser.firstName,
      email: iUser.email,
      password: iUser.password,
    });
    console.log(res);
  }
}
