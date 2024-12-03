import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HTTP_CONFIG_TOKEN,
  httpConfig,
  IHttpConfig,
} from './io/http/config/http.config';

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

  const configService = await loadConfig();
  const httpConfig = configService.get<IHttpConfig>(HTTP_CONFIG_TOKEN);
  await app.listen(httpConfig.port);
}

main();
