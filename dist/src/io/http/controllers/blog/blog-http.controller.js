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
exports.BlogHttpController = void 0;
const common_1 = require("@nestjs/common");
const abstract_http_controller_1 = require("../../../../common/http/abstract-http.controller");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../../../enum/role.enum");
const rbac_decorator_1 = require("../../decorators/rbac.decorator");
const auth_guard_1 = require("../../guard/auth.guard");
const rbac_guard_1 = require("../../guard/rbac.guard");
const result_1 = require("../../../../common/result");
const platform_express_1 = require("@nestjs/platform-express");
const create_blog_model_1 = require("./models/create-blog.model");
const blog_service_1 = require("../../../../application/services/blog.service");
const pagination_model_1 = require("../../../../common/pagination/pagination.model");
const update_blog_model_1 = require("./models/update-blog.model");
let BlogHttpController = class BlogHttpController extends abstract_http_controller_1.AbstractHttpController {
    constructor(blogService) {
        super();
        this.blogService = blogService;
    }
    async createBlog(response, body, file) {
        if (file && file.size > 2 * 1024 * 1024) {
            this.sendResult(response, (0, result_1.Err)('file size should not be more than 2MB'));
        }
        if (file && !['image/png', 'image/jpeg'].includes(file.mimetype)) {
            this.sendResult(response, (0, result_1.Err)('file type can be png or jpeg'));
        }
        const res = await this.blogService.createBlog({ image: null, title: body.title, content: body.content }, {
            mimetype: file.mimetype,
            directoryPath: null,
            buffer: file.buffer,
            size: file.size,
            name: file.originalname,
        });
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        this.sendResult(response, (0, result_1.Ok)({
            id: res.value.id,
            title: res.value.title,
            content: res.value.content,
            image: res.value.image,
        }));
    }
    async getBlogById(response, blogId) {
        const res = await this.blogService.getBlogById(blogId);
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        this.sendResult(response, (0, result_1.Ok)({
            id: res.value.id,
            title: res.value.title,
            content: res.value.content,
            image: res.value.image,
        }));
    }
    async getBlogList(response, page) {
        const pagination = new pagination_model_1.Pagination(page);
        const res = await this.blogService.getBlogList({
            skip: pagination.getSkip(),
            limit: pagination.getLimit(),
        });
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        this.sendResult(response, (0, result_1.Ok)({
            list: res.value.list,
            total: res.value.total,
            page: res.value.page,
            pageSize: res.value.pageSize,
        }));
    }
    async deleteBlog(response, blogId) {
        const res = await this.blogService.deleteBlog(blogId);
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        this.sendResult(response, (0, result_1.Ok)({ success: res.value }));
    }
    async updateBlog(response, body, blogId, file) {
        if (file && file.size > 2 * 1024 * 1024) {
            this.sendResult(response, (0, result_1.Err)('file size should not be more than 2MB'));
        }
        if (file && !['image/png', 'image/jpeg'].includes(file.mimetype)) {
            this.sendResult(response, (0, result_1.Err)('file type can be png or jpeg'));
        }
        const res = await this.blogService.updateBlog({
            id: +blogId,
            title: body.title,
            content: body.content,
        }, file
            ? {
                name: file.originalname,
                directoryPath: null,
                mimetype: file.mimetype,
                size: file.size,
                buffer: file.buffer,
            }
            : null);
        if (res.isError()) {
            this.sendResult(response, res);
            return;
        }
        return this.sendResult(response, (0, result_1.Ok)({ success: true }));
    }
};
exports.BlogHttpController = BlogHttpController;
__decorate([
    (0, common_1.Post)(),
    (0, rbac_decorator_1.RBAC)(role_enum_1.Role.USER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: create_blog_model_1.CreateBlogRequest,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_blog_model_1.CreateBlogRequest, Object]),
    __metadata("design:returntype", Promise)
], BlogHttpController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, rbac_decorator_1.RBAC)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BlogHttpController.prototype, "getBlogById", null);
__decorate([
    (0, common_1.Get)(),
    (0, rbac_decorator_1.RBAC)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], BlogHttpController.prototype, "getBlogList", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, rbac_decorator_1.RBAC)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BlogHttpController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, rbac_decorator_1.RBAC)(role_enum_1.Role.USER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: update_blog_model_1.UpdateBlogRequest,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('blogId')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_blog_model_1.UpdateBlogRequest, String, Object]),
    __metadata("design:returntype", Promise)
], BlogHttpController.prototype, "updateBlog", null);
exports.BlogHttpController = BlogHttpController = __decorate([
    (0, common_1.Controller)('blog'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiTags)('BLOG'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, rbac_guard_1.RBACGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogHttpController);
//# sourceMappingURL=blog-http.controller.js.map