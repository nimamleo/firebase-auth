import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IPgsqlConfig {
  user: string;
  password: string;
  db: string;
  host: string;
  port: number;
}

export const PGSQL_CONFIG_TOKEN = 'pgsql-config-token';

export const pgsqlConfig = registerAs<
  IPgsqlConfig,
  ConfigFactory<IPgsqlConfig>
>(PGSQL_CONFIG_TOKEN, () => {
  const errors: string[] = [];

  if (!process.env.PGSQL_USER) {
    errors.push('PGSQL_USER not provided');
  }
  if (!process.env.PGSQL_PASSWORD) {
    errors.push('PGSQL_PASSWORD not provided');
  }
  if (!process.env.PGSQL_HOST) {
    errors.push('PGSQL_HOST not provided');
  }
  if (!process.env.PGSQL_PORT) {
    errors.push('PGSQL_PORT not provided');
  }
  if (!process.env.PGSQL_DATABASE) {
    errors.push('PGSQL_DATABASE not provided');
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return {
    host: process.env.PGSQL_HOST,
    port: Number(process.env.PGSQL_PORT),
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    db: process.env.PGSQL_DATABASE,
  };
});
