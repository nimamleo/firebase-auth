import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { firebaseConfig } from './infrastructure/firebase/config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [firebaseConfig],
    }),
  ],
})
export class AppModule {}
