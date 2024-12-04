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
exports.BlogPgsqlService = void 0;
const common_1 = require("@nestjs/common");
const result_1 = require("../../../../common/result");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("../entities/blog.entity");
const typeorm_2 = require("typeorm");
const handle_error_decorator_1 = require("../../../../common/decorators/handle-error.decorator");
const status_enum_1 = require("../../../../common/enums/status.enum");
let BlogPgsqlService = class BlogPgsqlService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async createBlog(iBlog) {
        const newData = blog_entity_1.BlogEntity.fromIBlog(iBlog);
        const res = await this.blogRepository.save(newData);
        if (!res) {
            return (0, result_1.Err)('something went wrong', status_enum_1.GenericStatusCodes.INTERNAL);
        }
        return (0, result_1.Ok)(blog_entity_1.BlogEntity.toIBlogEntity(res));
    }
    async getBlogById(id) {
        const res = await this.blogRepository
            .createQueryBuilder('b')
            .where('b.id = :id', { id: id })
            .getOne();
        if (!res) {
            return (0, result_1.Err)('blog not found', status_enum_1.GenericStatusCodes.NOT_FOUND);
        }
        return (0, result_1.Ok)(blog_entity_1.BlogEntity.toIBlogEntity(res));
    }
    async getBlogList(limitation) {
        const [res, count] = await this.blogRepository
            .createQueryBuilder('b')
            .offset(limitation.skip)
            .limit(limitation.limit)
            .getManyAndCount();
        return (0, result_1.Ok)([res.map((x) => blog_entity_1.BlogEntity.toIBlogEntity(x)), count]);
    }
    async updateBlog(iBlogEntity) {
        const res = await this.blogRepository.update(iBlogEntity.id, iBlogEntity);
        if (res.affected === 0) {
            return (0, result_1.Err)('something went wrong');
        }
        return (0, result_1.Ok)(res.affected > 0);
    }
    async deleteBlog(id) {
        const res = await this.blogRepository.delete(id);
        if (res.affected === 0) {
            return (0, result_1.Err)('something went wrong');
        }
        return (0, result_1.Ok)(res.affected > 0);
    }
};
exports.BlogPgsqlService = BlogPgsqlService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogPgsqlService.prototype, "createBlog", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPgsqlService.prototype, "getBlogById", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogPgsqlService.prototype, "getBlogList", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogPgsqlService.prototype, "updateBlog", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPgsqlService.prototype, "deleteBlog", null);
exports.BlogPgsqlService = BlogPgsqlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.BlogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogPgsqlService);
//# sourceMappingURL=blog-pgsql.service.js.map