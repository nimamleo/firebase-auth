import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HTTP_CONFIG_TOKEN,
  httpConfig,
  IHttpConfig,
} from './io/http/config/http.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function loadConfig(): Promise<ConfigService> {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [httpConfig],
      cache: true,
    }),
  );

  return appContext.get<ConfigService>(ConfigService);
}

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');

  const configService = await loadConfig();

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const httpConfig = configService.get<IHttpConfig>(HTTP_CONFIG_TOKEN);
  await app.listen(httpConfig.port);
  logger.debug(`application is running on port: ${httpConfig.port}`);
}

main();
