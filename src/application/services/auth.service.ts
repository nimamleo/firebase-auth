import { Inject, Injectable } from '@nestjs/common';
import { FirebaseService } from '../../infrastructure/firebase/service/firebase.service';
import { IUser } from '../../models/user.model';
import { HandleError } from '../../common/decorators/handle-error.decorator';
import {
  IUserDatabaseProvider,
  USER_DATABASE_PROVIDER,
} from '../../infrastructure/database/provider/user.provider';
import { Err, Ok, Result } from '../../common/result';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  IJwtConfig,
  JWT_CONFIG_TOKEN,
} from '../../infrastructure/jwt/config/jwt.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtConfig: IJwtConfig;
  constructor(
    @Inject(USER_DATABASE_PROVIDER)
    private readonly userDatabaseProvider: IUserDatabaseProvider,
    private readonly firebaseService: FirebaseService,
    configService: ConfigService,
  ) {
    this.jwtConfig = configService.get(JWT_CONFIG_TOKEN);
  }

  @HandleError
  async register(iUser: IUser): Promise<Result<string>> {
    const salt = await bcrypt.genSalt(12);
    iUser.password = await bcrypt.hash(iUser.password, salt);

    const createUser = await this.firebaseService.createUser(iUser);
    if (createUser.isError()) {
      return Err(createUser.err);
    }

    const generateToken = await this.generateToken(createUser.value.uid);
    if (createUser.isError()) {
      return Err(generateToken.err);
    }

    return Ok(generateToken.value);
  }

  @HandleError
  async verifyUser(token: string): Promise<Result<IUser>> {
    const decoded = jwt.verify(token, this.jwtConfig.secret);
    console.log(decoded);
    const res = await this.firebaseService.getUserById(decoded['uid']);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok({
      email: res.value.email,
      password: null,
      role: res.value.customClaims['role'],
      firstName: res.value.displayName,
    });
  }

  @HandleError
  async login(iUser: Partial<IUser>): Promise<Result<string>> {
    const res = await this.firebaseService.getUserByEmail(iUser.email);
    if (res.isError()) {
      return Err(res.err);
    }
    const compare = await bcrypt.compare(
      iUser.password,
      res.value.customClaims['password'],
    );
    if (!compare) {
      return Err('credential not valid');
    }

    const generateToken = await this.generateToken(res.value.uid);
    if (generateToken.isError()) {
      return Err(generateToken.err);
    }

    return Ok(generateToken.value);
  }

  @HandleError
  async generateToken(id: string): Promise<Result<string>> {
    const token = jwt.sign({ uid: id }, this.jwtConfig.secret, {
      expiresIn: '1d',
    });
    if (!token) {
      return Err('something went wrong');
    }
    return Ok(token);
  }
}
