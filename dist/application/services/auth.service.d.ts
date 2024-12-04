import { FirebaseService } from '../../infrastructure/firebase/service/firebase.service';
import { IUser, IUserEntity } from '../../models/user.model';
import { IUserDatabaseProvider } from '../../infrastructure/database/provider/user.provider';
import { Result } from '../../common/result';
export declare class AuthService {
    private readonly userDatabaseProvider;
    private readonly firebaseService;
    constructor(userDatabaseProvider: IUserDatabaseProvider, firebaseService: FirebaseService);
    register(iUser: IUser): Promise<Result<IUserEntity>>;
}
