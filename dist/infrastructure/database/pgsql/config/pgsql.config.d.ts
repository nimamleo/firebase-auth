import { ConfigFactory } from '@nestjs/config';
export interface IPgsqlConfig {
    user: string;
    password: string;
    db: string;
    host: string;
    port: number;
}
export declare const PGSQL_CONFIG_TOKEN = "pgsql-config-token";
export declare const pgsqlConfig: ConfigFactory<IPgsqlConfig> & import("@nestjs/config").ConfigFactoryKeyHost<IPgsqlConfig | Promise<IPgsqlConfig>>;
