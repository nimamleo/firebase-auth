import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IPgsqlConfig, PGSQL_CONFIG_TOKEN } from './pgsql/config/pgsql.config';
import { BlogEntity } from './pgsql/entities/blog.entity';
import { BLOG_DATABASE_PROVIDER } from './provider/blog.provider';
import { BlogPgsqlService } from './pgsql/service/blog-pgsql.service';

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
          migrations: ['src/**/*.migration.{ts,js}'],
          entities: [BlogEntity],
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([BlogEntity]),
  ],
  providers: [
    {
      provide: BLOG_DATABASE_PROVIDER,
      useClass: BlogPgsqlService,
    },
  ],
  exports: [BLOG_DATABASE_PROVIDER],
})
export class DatabaseModule {}
