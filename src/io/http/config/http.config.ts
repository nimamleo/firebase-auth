import { ConfigFactory, registerAs } from '@nestjs/config';

export interface IHttpConfig {
  port: number;
}

export const HTTP_CONFIG_TOKEN = 'http-config-token';

export const httpConfig = registerAs<IHttpConfig, ConfigFactory<IHttpConfig>>(
  HTTP_CONFIG_TOKEN,
  () => {
    const errors: string[] = [];

    if (!process.env.HTTP_PORT) {
      errors.push('HTTP_PORT not provided');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    return {
      port: Number(process.env.HTTP_PORT),
    };
  },
);
