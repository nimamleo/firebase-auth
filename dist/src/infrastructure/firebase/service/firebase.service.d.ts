import { IUser } from '../../../models/user.model';
import { ConfigService } from '@nestjs/config';
import { Result } from '../../../common/result';
import { UserRecord } from 'firebase-admin/lib/auth';
export declare class FirebaseService {
    private readonly firebaseAdmin;
    constructor(configService: ConfigService);
    createUser(iUser: IUser): Promise<Result<UserRecord>>;
    getUserByEmail(email: string): Promise<Result<UserRecord>>;
    getUserById(id: string): Promise<Result<UserRecord>>;
}
