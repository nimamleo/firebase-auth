"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgsqlConfig = exports.PGSQL_CONFIG_TOKEN = void 0;
const config_1 = require("@nestjs/config");
const process = require("node:process");
exports.PGSQL_CONFIG_TOKEN = 'pgsql-config-token';
exports.pgsqlConfig = (0, config_1.registerAs)(exports.PGSQL_CONFIG_TOKEN, () => {
    const errors = [];
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
//# sourceMappingURL=pgsql.config.js.map