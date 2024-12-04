import { Injectable } from '@nestjs/common';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import { HandleError } from '../../../common/decorators/handle-error.decorator';
import { IUser } from '../../../models/user.model';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: app.App;
  constructor() {}

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
