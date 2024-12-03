import { IEntity } from '../common/interfaces/entity.interface';
import { IDated } from '../common/interfaces/dated.interface';
import { Role } from '../enum/role.enum';

export interface IUser {
  password: string;
  email: string;
  role: Role;
}

export interface IUserEntity extends IUser, IEntity, IDated {}
