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
let AuthService = class AuthService {
    constructor(userDatabaseProvider, firebaseService) {
        this.userDatabaseProvider = userDatabaseProvider;
        this.firebaseService = firebaseService;
    }
    async register(iUser) {
        const getUser = await this.userDatabaseProvider.getUserByEmail(iUser.email);
        if (getUser.isError()) {
            const res = await this.userDatabaseProvider.createUser(iUser);
            if (res.isError()) {
                return (0, result_1.Err)(res.err);
            }
            const firebaseRes = await this.firebaseService.createUser(iUser);
        }
        return (0, result_1.Ok)(getUser.value);
    }
};
exports.AuthService = AuthService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "register", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_provider_1.USER_DATABASE_PROVIDER)),
    __metadata("design:paramtypes", [Object, firebase_service_1.FirebaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map