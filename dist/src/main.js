"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const http_config_1 = require("./io/http/config/http.config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function loadConfig() {
    const appContext = await core_1.NestFactory.createApplicationContext(config_1.ConfigModule.forRoot({
        load: [http_config_1.httpConfig],
        cache: true,
    }));
    return appContext.get(config_1.ConfigService);
}
async function main() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('main');
    const configService = await loadConfig();
    const config = new swagger_1.DocumentBuilder()
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    const httpConfig = configService.get(http_config_1.HTTP_CONFIG_TOKEN);
    await app.listen(httpConfig.port);
    logger.debug(`application is running on port: ${httpConfig.port}`);
}
main();
//# sourceMappingURL=main.js.map