import { ConfigFactory } from '@nestjs/config';
export interface IHttpConfig {
    port: number;
}
export declare const HTTP_CONFIG_TOKEN = "http-config-token";
export declare const httpConfig: ConfigFactory<IHttpConfig> & import("@nestjs/config").ConfigFactoryKeyHost<IHttpConfig | Promise<IHttpConfig>>;
