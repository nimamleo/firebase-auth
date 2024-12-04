import { IUser, IUserEntity } from '../../../models/user.model';
import { Result } from '../../../common/result';
export interface IUserReader {
    getUserByEmail(email: string): Promise<Result<IUserEntity>>;
}
export interface IUserWriter {
    createUser(iUser: IUser): Promise<Result<IUserEntity>>;
}
export interface IUserDatabaseProvider extends IUserReader, IUserWriter {
}
export declare const USER_DATABASE_PROVIDER = "user-database-provider";
