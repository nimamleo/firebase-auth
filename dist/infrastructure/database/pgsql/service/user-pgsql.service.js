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
exports.UserPgSqlService = void 0;
const common_1 = require("@nestjs/common");
const result_1 = require("../../../../common/result");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const handle_error_decorator_1 = require("../../../../common/decorators/handle-error.decorator");
const status_enum_1 = require("../../../../common/enums/status.enum");
let UserPgSqlService = class UserPgSqlService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(iUser) {
        const newUser = user_entity_1.UserEntity.fromIUser(iUser);
        const res = await this.userRepository.save(newUser);
        if (!res) {
            return (0, result_1.Err)('something went wrong', status_enum_1.GenericStatusCodes.INTERNAL);
        }
        return (0, result_1.Ok)(user_entity_1.UserEntity.toIUserEntity(res));
    }
    async getUserByEmail(email) {
        const res = await this.userRepository
            .createQueryBuilder('u')
            .where('u.email = :email', { email: email })
            .getOne();
        if (!res) {
            return (0, result_1.Err)('user not found!', status_enum_1.GenericStatusCodes.NOT_FOUND);
        }
        return (0, result_1.Ok)(user_entity_1.UserEntity.toIUserEntity(res));
    }
};
exports.UserPgSqlService = UserPgSqlService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPgSqlService.prototype, "createUser", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserPgSqlService.prototype, "getUserByEmail", null);
exports.UserPgSqlService = UserPgSqlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserPgSqlService);
//# sourceMappingURL=user-pgsql.service.js.map