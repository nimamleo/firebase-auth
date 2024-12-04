"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.JWT_CONFIG_TOKEN = void 0;
const config_1 = require("@nestjs/config");
const process = require("node:process");
exports.JWT_CONFIG_TOKEN = 'jwt-config-token';
exports.jwtConfig = (0, config_1.registerAs)(exports.JWT_CONFIG_TOKEN, () => {
    const errors = [];
    if (!process.env.JWT_SECRET) {
        errors.push('JWT_SECRET not provided');
    }
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
    return {
        secret: process.env.JWT_SECRET,
    };
});
//# sourceMappingURL=jwt.config.js.map