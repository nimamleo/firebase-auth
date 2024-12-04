import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { firebaseConfig } from './infrastructure/firebase/config/firebase.config';
import { pgsqlConfig } from './infrastructure/database/pgsql/config/pgsql.config';
import { IoModule } from './io/io.module';
import { jwtConfig } from './infrastructure/jwt/config/jwt.config';

@Module({
  imports: [
    IoModule,
    ConfigModule.forRoot({
      cache: true,
      load: [firebaseConfig, pgsqlConfig, jwtConfig],
    }),
  ],
})
export class AppModule {}
