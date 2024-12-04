import { ConfigFactory } from '@nestjs/config';
export interface IJwtConfig {
    secret: string;
}
export declare const JWT_CONFIG_TOKEN = "jwt-config-token";
export declare const jwtConfig: ConfigFactory<IJwtConfig> & import("@nestjs/config").ConfigFactoryKeyHost<IJwtConfig | Promise<IJwtConfig>>;
