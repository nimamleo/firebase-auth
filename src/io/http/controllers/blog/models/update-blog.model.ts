import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ format: 'binary', type: 'string', required: false })
  file: Buffer;
}
export class UpdateBlogResponse {
  @ApiProperty()
  success: boolean;
}
