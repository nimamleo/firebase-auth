import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IJwtConfig {
  secret: string;
}

export const JWT_CONFIG_TOKEN = 'jwt-config-token';

export const jwtConfig = registerAs<IJwtConfig, ConfigFactory<IJwtConfig>>(
  JWT_CONFIG_TOKEN,
  () => {
    const errors: string[] = [];

    if (!process.env.JWT_SECRET) {
      errors.push('JWT_SECRET not provided');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    return {
      secret: process.env.JWT_SECRET,
    };
  },
);
