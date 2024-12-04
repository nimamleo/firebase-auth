"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_config_1 = require("./infrastructure/firebase/config/firebase.config");
const pgsql_config_1 = require("./infrastructure/database/pgsql/config/pgsql.config");
const io_module_1 = require("./io/io.module");
const jwt_config_1 = require("./infrastructure/jwt/config/jwt.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            io_module_1.IoModule,
            config_1.ConfigModule.forRoot({
                cache: true,
                load: [firebase_config_1.firebaseConfig, pgsql_config_1.pgsqlConfig, jwt_config_1.jwtConfig],
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map