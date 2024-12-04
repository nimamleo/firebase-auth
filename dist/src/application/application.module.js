"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../infrastructure/database/database.module");
const auth_service_1 = require("./services/auth.service");
const firebase_module_1 = require("../infrastructure/firebase/firebase.module");
const config_1 = require("@nestjs/config");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, firebase_module_1.FirebaseModule, config_1.ConfigModule],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map