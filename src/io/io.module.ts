import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth/auth-http.controller';
import { ApplicationModule } from '../application/application.module';
import { BlogHttpController } from './http/controllers/blog/blog-http.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthHttpController, BlogHttpController],
})
export class IoModule {}
