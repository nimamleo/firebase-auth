import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './pgsql/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IPgsqlConfig, PGSQL_CONFIG_TOKEN } from './pgsql/config/pgsql.config';

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
          entities: [],
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class DatabaseModule {}
