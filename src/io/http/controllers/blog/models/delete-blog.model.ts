import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteBlogRequest {}
export class DeleteBlogResponse {
  @ApiProperty()
  success: boolean;
}
