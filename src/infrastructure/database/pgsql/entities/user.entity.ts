import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../../../enum/role.enum';
import { IUser, IUserEntity } from '../../../../models/user.model';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 225 })
  firstName: string;

  @Column({ type: 'varchar', length: 225, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 225 })
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIUser(iUser: IUser): UserEntity {
    if (!iUser) {
      return null;
    }

    const user = new UserEntity();

    user.email = iUser.email;
    user.role = iUser.role;
    user.password = iUser.password;
    user.firstName = iUser.firstName;

    return user;
  }

  static toIUserEntity(user: UserEntity): IUserEntity {
    if (!user) {
      return null;
    }

    return {
      id: user.id.toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
