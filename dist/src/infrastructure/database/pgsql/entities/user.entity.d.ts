import { Role } from '../../../../enum/role.enum';
import { IUser, IUserEntity } from '../../../../models/user.model';
export declare class UserEntity {
    id: number;
    firstName: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    static fromIUser(iUser: IUser): UserEntity;
    static toIUserEntity(user: UserEntity): IUserEntity;
}
