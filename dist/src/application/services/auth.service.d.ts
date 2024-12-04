import { FirebaseService } from '../../infrastructure/firebase/service/firebase.service';
import { IUser } from '../../models/user.model';
import { Result } from '../../common/result';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly firebaseService;
    private readonly jwtConfig;
    constructor(firebaseService: FirebaseService, configService: ConfigService);
    register(iUser: IUser): Promise<Result<string>>;
    verifyUser(token: string): Promise<Result<IUser>>;
    login(iUser: Partial<IUser>): Promise<Result<string>>;
    generateToken(id: string): Promise<Result<string>>;
}
