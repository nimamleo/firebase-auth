"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const http_config_1 = require("./io/http/config/http.config");
async function loadConfig() {
    const appContext = await core_1.NestFactory.createApplicationContext(config_1.ConfigModule.forRoot({
        load: [http_config_1.httpConfig],
        cache: true,
    }));
    return appContext.get(config_1.ConfigService);
}
async function main() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = await loadConfig();
    const httpConfig = configService.get(http_config_1.HTTP_CONFIG_TOKEN);
    await app.listen(httpConfig.port);
}
main();
//# sourceMappingURL=main.js.map