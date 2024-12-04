import { IUser } from '../../../models/user.model';
export declare class FirebaseService {
    private readonly firebaseAdmin;
    constructor();
    createUser(iUser: IUser): Promise<void>;
}
