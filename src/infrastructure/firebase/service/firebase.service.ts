import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as firebaseAdmin from 'firebase-admin';
import { HandleError } from '../../../common/decorators/handle-error.decorator';
import { IUser } from '../../../models/user.model';
import {
  FIREBASE_CONFIG_TOKEN,
  IFirebaseConfig,
} from '../config/firebase.config';
import { ConfigService } from '@nestjs/config';
import { Err, Ok, Result } from '../../../common/result';
import { GenericStatusCodes } from '../../../common/enums/status.enum';
import { UserRecord } from 'firebase-admin/lib/auth';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: admin.app.App;
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
  async createUser(iUser: IUser): Promise<Result<UserRecord>> {
    const res = await this.firebaseAdmin.auth().createUser({
      displayName: iUser.firstName,
      email: iUser.email,
      password: iUser.password,
    });
    await this.firebaseAdmin.auth().setCustomUserClaims(res.uid, {
      role: iUser.role,
      password: iUser.password,
    });

    if (!res.uid) {
      return Err('something went wrong', GenericStatusCodes.INTERNAL);
    }

    return Ok(res);
  }

  @HandleError
  async getUserByEmail(email: string): Promise<Result<UserRecord>> {
    const res = await this.firebaseAdmin.auth().getUserByEmail(email);
    if (!res) {
      return Err('something went wrong');
    }

    return Ok(res);
  }

  async getUserById(id: string): Promise<Result<UserRecord>> {
    const res = await this.firebaseAdmin.auth().getUser(id);
    if (!res) {
      return Err('something went wrong');
    }

    return Ok(res);
  }
}
