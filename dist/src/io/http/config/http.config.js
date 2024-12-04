"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpConfig = exports.HTTP_CONFIG_TOKEN = void 0;
const config_1 = require("@nestjs/config");
exports.HTTP_CONFIG_TOKEN = 'http-config-token';
exports.httpConfig = (0, config_1.registerAs)(exports.HTTP_CONFIG_TOKEN, () => {
    const errors = [];
    if (!process.env.HTTP_PORT) {
        errors.push('HTTP_PORT not provided');
    }
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
    return {
        port: Number(process.env.HTTP_PORT),
    };
});
//# sourceMappingURL=http.config.js.map