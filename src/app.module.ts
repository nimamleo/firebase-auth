import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { firebaseConfig } from './infrastructure/firebase/config/firebase.config';
import { pgsqlConfig } from './infrastructure/database/pgsql/config/pgsql.config';
import { IoModule } from './io/io.module';

@Module({
  imports: [
    IoModule,
    ConfigModule.forRoot({
      cache: true,
      load: [firebaseConfig, pgsqlConfig],
    }),
  ],
})
export class AppModule {}
