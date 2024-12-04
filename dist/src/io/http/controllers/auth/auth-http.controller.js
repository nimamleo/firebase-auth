"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHttpController = void 0;
const common_1 = require("@nestjs/common");
const abstract_http_controller_1 = require("../../../../common/http/abstract-http.controller");
const swagger_1 = require("@nestjs/swagger");
const register_model_1 = require("./models/register.model");
const auth_service_1 = require("../../../../application/services/auth.service");
const role_enum_1 = require("../../../../enum/role.enum");
const result_1 = require("../../../../common/result");
const login_model_1 = require("./models/login.model");
let AuthHttpController = class AuthHttpController extends abstract_http_controller_1.AbstractHttpController {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async register(response, body) {
        const res = await this.authService.register({
            email: body.email,
            password: body.password,
            role: role_enum_1.Role.USER,
            firstName: body.firstName,
        });
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        this.sendResult(response, (0, result_1.Ok)({ token: res.value }));
    }
    async login(response, body) {
        const res = await this.authService.login({
            email: body.email,
            password: body.password,
        });
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        this.sendResult(response, (0, result_1.Ok)({ token: res.value }));
    }
};
exports.AuthHttpController = AuthHttpController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBody)({ type: register_model_1.RegisterRequest }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_model_1.RegisterRequest]),
    __metadata("design:returntype", Promise)
], AuthHttpController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: login_model_1.LoginRequest }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_model_1.LoginRequest]),
    __metadata("design:returntype", Promise)
], AuthHttpController.prototype, "login", null);
exports.AuthHttpController = AuthHttpController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiTags)('AUTH'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthHttpController);
//# sourceMappingURL=auth-http.controller.js.map