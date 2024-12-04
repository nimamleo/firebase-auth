"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoModule = void 0;
const common_1 = require("@nestjs/common");
const auth_http_controller_1 = require("./http/controllers/auth/auth-http.controller");
const application_module_1 = require("../application/application.module");
const blog_http_controller_1 = require("./http/controllers/blog/blog-http.controller");
let IoModule = class IoModule {
};
exports.IoModule = IoModule;
exports.IoModule = IoModule = __decorate([
    (0, common_1.Module)({
        imports: [application_module_1.ApplicationModule],
        controllers: [auth_http_controller_1.AuthHttpController, blog_http_controller_1.BlogHttpController],
    })
], IoModule);
//# sourceMappingURL=io.module.js.map