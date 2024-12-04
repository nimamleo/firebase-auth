import { Injectable } from '@nestjs/common';
import { IUserDatabaseProvider } from '../../provider/user.provider';
import { IUser, IUserEntity } from '../../../../models/user.model';
import { Err, Ok, Result } from '../../../../common/result';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HandleError } from '../../../../common/decorators/handle-error.decorator';
import { GenericStatusCodes } from '../../../../common/enums/status.enum';

@Injectable()
export class UserPgSqlService implements IUserDatabaseProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @HandleError
  async createUser(iUser: IUser): Promise<Result<IUserEntity>> {
    const newUser = UserEntity.fromIUser(iUser);
    const res = await this.userRepository.save(newUser);
    if (!res) {
      return Err('something went wrong', GenericStatusCodes.INTERNAL);
    }

    return Ok(UserEntity.toIUserEntity(res));
  }

  @HandleError
  async getUserByEmail(email: string): Promise<Result<IUserEntity>> {
    const res = await this.userRepository
      .createQueryBuilder('u')
      .where('u.email = :email', { email: email })
      .getOne();

    if (!res) {
      return Err('user not found!', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(UserEntity.toIUserEntity(res));
  }

  @HandleError
  async deleteUser(id: string): Promise<Result<boolean>> {
    const res = await this.userRepository.delete(id);
    if (res.affected === 0) {
      return Err('some thing went wrong', GenericStatusCodes.INTERNAL);
    }

    return Ok(res.affected > 0);
  }
}
