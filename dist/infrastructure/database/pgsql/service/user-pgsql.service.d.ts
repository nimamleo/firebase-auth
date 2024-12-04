import { IUserDatabaseProvider } from '../../provider/user.provider';
import { IUser, IUserEntity } from '../../../../models/user.model';
import { Result } from '../../../../common/result';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserPgSqlService implements IUserDatabaseProvider {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(iUser: IUser): Promise<Result<IUserEntity>>;
    getUserByEmail(email: string): Promise<Result<IUserEntity>>;
}
