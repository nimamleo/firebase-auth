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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const firebaseAdmin = require("firebase-admin");
const handle_error_decorator_1 = require("../../../common/decorators/handle-error.decorator");
const firebase_config_1 = require("../config/firebase.config");
const config_1 = require("@nestjs/config");
const result_1 = require("../../../common/result");
const status_enum_1 = require("../../../common/enums/status.enum");
let FirebaseService = class FirebaseService {
    constructor(configService) {
        const firebaseConfig = configService.get(firebase_config_1.FIREBASE_CONFIG_TOKEN);
        this.firebaseAdmin = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert({
                privateKey: firebaseConfig.privateKey,
                projectId: firebaseConfig.projectId,
                clientEmail: firebaseConfig.clientEmail,
            }),
        });
    }
    async createUser(iUser) {
        const res = await this.firebaseAdmin.auth().createUser({
            displayName: iUser.firstName,
            email: iUser.email,
            password: iUser.password,
        });
        await this.firebaseAdmin.auth().setCustomUserClaims(res.uid, {
            role: iUser.role,
            password: iUser.password,
        });
        if (!res.uid) {
            return (0, result_1.Err)('something went wrong', status_enum_1.GenericStatusCodes.INTERNAL);
        }
        return (0, result_1.Ok)(res);
    }
    async getUserByEmail(email) {
        const res = await this.firebaseAdmin.auth().getUserByEmail(email);
        if (!res) {
            return (0, result_1.Err)('something went wrong');
        }
        return (0, result_1.Ok)(res);
    }
    async getUserById(id) {
        const res = await this.firebaseAdmin.auth().getUser(id);
        if (!res) {
            return (0, result_1.Err)('something went wrong');
        }
        return (0, result_1.Ok)(res);
    }
};
exports.FirebaseService = FirebaseService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FirebaseService.prototype, "createUser", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FirebaseService.prototype, "getUserByEmail", null);
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map