import { Inject, Injectable } from '@nestjs/common';
import { FirebaseService } from '../../infrastructure/firebase/service/firebase.service';
import { IUser, IUserEntity } from '../../models/user.model';
import { HandleError } from '../../common/decorators/handle-error.decorator';
import {
  IUserDatabaseProvider,
  USER_DATABASE_PROVIDER,
} from '../../infrastructure/database/provider/user.provider';
import { Err, Ok, Result } from '../../common/result';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_DATABASE_PROVIDER)
    private readonly userDatabaseProvider: IUserDatabaseProvider,
    private readonly firebaseService: FirebaseService,
  ) {}

  @HandleError
  async register(iUser: IUser): Promise<Result<IUserEntity>> {
    const getUser = await this.userDatabaseProvider.getUserByEmail(iUser.email);
    if (getUser.isError()) {
      const res = await this.userDatabaseProvider.createUser(iUser);
      if (res.isError()) {
        return Err(res.err);
      }

      const firebaseRes = await this.firebaseService.createUser(iUser);
      // if(firebaseRes)
    }
    return Ok(getUser.value);
  }
}
