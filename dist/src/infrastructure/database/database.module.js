"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./pgsql/entities/user.entity");
const config_1 = require("@nestjs/config");
const pgsql_config_1 = require("./pgsql/config/pgsql.config");
const user_provider_1 = require("./provider/user.provider");
const user_pgsql_service_1 = require("./pgsql/service/user-pgsql.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const pgsqlConfig = configService.get(pgsql_config_1.PGSQL_CONFIG_TOKEN);
                    return {
                        type: 'postgres',
                        host: pgsqlConfig.host,
                        port: pgsqlConfig.port,
                        username: pgsqlConfig.user,
                        password: pgsqlConfig.password,
                        database: pgsqlConfig.db,
                        migrationsRun: true,
                        synchronize: false,
                        migrations: [],
                        entities: [user_entity_1.UserEntity],
                        logging: true,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
        ],
        providers: [
            {
                provide: user_provider_1.USER_DATABASE_PROVIDER,
                useClass: user_pgsql_service_1.UserPgSqlService,
            },
        ],
        exports: [user_provider_1.USER_DATABASE_PROVIDER],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map