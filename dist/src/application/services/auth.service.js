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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../../infrastructure/firebase/service/firebase.service");
const handle_error_decorator_1 = require("../../common/decorators/handle-error.decorator");
const user_provider_1 = require("../../infrastructure/database/provider/user.provider");
const result_1 = require("../../common/result");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_config_1 = require("../../infrastructure/jwt/config/jwt.config");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userDatabaseProvider, firebaseService, configService) {
        this.userDatabaseProvider = userDatabaseProvider;
        this.firebaseService = firebaseService;
        this.jwtConfig = configService.get(jwt_config_1.JWT_CONFIG_TOKEN);
    }
    async register(iUser) {
        const salt = await bcrypt.genSalt(12);
        iUser.password = await bcrypt.hash(iUser.password, salt);
        const createUser = await this.firebaseService.createUser(iUser);
        if (createUser.isError()) {
            return (0, result_1.Err)(createUser.err);
        }
        const generateToken = await this.generateToken(createUser.value.uid);
        if (createUser.isError()) {
            return (0, result_1.Err)(generateToken.err);
        }
        return (0, result_1.Ok)(generateToken.value);
    }
    async verifyUser(token) {
        const decoded = jwt.verify(token, this.jwtConfig.secret);
        console.log(decoded);
        const res = await this.firebaseService.getUserById(decoded['uid']);
        if (res.isError()) {
            return (0, result_1.Err)(res.err);
        }
        console.log(res);
        return (0, result_1.Ok)({
            email: res.value.email,
            password: null,
            role: res.value.customClaims['role'],
            firstName: res.value.displayName,
        });
    }
    async login(iUser) {
        const res = await this.firebaseService.getUserByEmail(iUser.email);
        if (res.isError()) {
            return (0, result_1.Err)(res.err);
        }
        const compare = await bcrypt.compare(iUser.password, res.value.customClaims['password']);
        if (!compare) {
            return (0, result_1.Err)('credential not valid');
        }
        const generateToken = await this.generateToken(res.value.uid);
        if (generateToken.isError()) {
            return (0, result_1.Err)(generateToken.err);
        }
        return (0, result_1.Ok)(generateToken.value);
    }
    async generateToken(id) {
        const token = jwt.sign({ uid: id }, this.jwtConfig.secret, {
            expiresIn: '1d',
        });
        if (!token) {
            return (0, result_1.Err)('something went wrong');
        }
        return (0, result_1.Ok)(token);
    }
};
exports.AuthService = AuthService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "register", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "verifyUser", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "generateToken", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_provider_1.USER_DATABASE_PROVIDER)),
    __metadata("design:paramtypes", [Object, firebase_service_1.FirebaseService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map