import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './pgsql/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IPgsqlConfig, PGSQL_CONFIG_TOKEN } from './pgsql/config/pgsql.config';
import { USER_DATABASE_PROVIDER } from './provider/user.provider';
import { UserPgSqlService } from './pgsql/service/user-pgsql.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const pgsqlConfig: IPgsqlConfig = configService.get(PGSQL_CONFIG_TOKEN);
        return {
          type: 'postgres',
          host: pgsqlConfig.host,
          port: pgsqlConfig.port,
          username: pgsqlConfig.user,
          password: pgsqlConfig.password,
          database: pgsqlConfig.db,
          migrationsRun: true,
          synchronize: false,
          migrations: [],
          entities: [UserEntity],
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: USER_DATABASE_PROVIDER,
      useClass: UserPgSqlService,
    },
  ],
  exports: [USER_DATABASE_PROVIDER],
})
export class DatabaseModule {}
