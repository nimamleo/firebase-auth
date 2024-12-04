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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const blog_provider_1 = require("../../infrastructure/database/provider/blog.provider");
const result_1 = require("../../common/result");
const handle_error_decorator_1 = require("../../common/decorators/handle-error.decorator");
const storage_provider_1 = require("../../infrastructure/storage/provider/storage.provider");
const paginatio_result_1 = require("../../common/pagination/paginatio-result");
let BlogService = class BlogService {
    constructor(blogDatabaseProvider, assetService) {
        this.blogDatabaseProvider = blogDatabaseProvider;
        this.assetService = assetService;
    }
    async createBlog(iBlog, iAsset) {
        const uploadImage = await this.assetService.createFile(iAsset);
        if (uploadImage.isError()) {
            return (0, result_1.Err)(uploadImage.err);
        }
        const createBlog = await this.blogDatabaseProvider.createBlog({
            content: iBlog.content,
            title: iBlog.title,
            image: uploadImage.value.directoryPath,
        });
        if (createBlog.isError()) {
            await this.assetService.deleteFile(uploadImage.value.directoryPath);
            return (0, result_1.Err)(createBlog.err);
        }
        return (0, result_1.Ok)(createBlog.value);
    }
    async getBlogById(id) {
        const res = await this.blogDatabaseProvider.getBlogById(id);
        if (res.isError()) {
            return (0, result_1.Err)(res.err);
        }
        return (0, result_1.Ok)(res.value);
    }
    async getBlogList(limitation) {
        const res = await this.blogDatabaseProvider.getBlogList(limitation);
        if (res.isError()) {
            return (0, result_1.Err)(res.err);
        }
        return (0, result_1.Ok)(new paginatio_result_1.PaginationResult(res.value[0], res.value[1], limitation));
    }
    async updateBlog(iBlogEntity, iAsset) {
        const getBlog = await this.blogDatabaseProvider.getBlogById(iBlogEntity.id.toString());
        if (getBlog.isError()) {
            return (0, result_1.Err)(getBlog.err);
        }
        if (iAsset && iAsset.buffer) {
            const deleteImage = await this.assetService.deleteFile(getBlog.value.image);
            if (deleteImage.isError()) {
                return (0, result_1.Err)(deleteImage.err);
            }
            const createImage = await this.assetService.createFile(iAsset);
            if (createImage.isError()) {
                return (0, result_1.Err)(createImage.err);
            }
            iBlogEntity.image = createImage.value.directoryPath;
        }
        const res = await this.blogDatabaseProvider.updateBlog(iBlogEntity);
        if (res.isError()) {
            return (0, result_1.Err)(res.err);
        }
        return (0, result_1.Ok)(res.value);
    }
    async deleteBlog(id) {
        const getBlog = await this.blogDatabaseProvider.getBlogById(id);
        if (getBlog.isError()) {
            return (0, result_1.Err)(getBlog.err);
        }
        const res = await this.blogDatabaseProvider.deleteBlog(id);
        if (res.isError()) {
            return (0, result_1.Err)(res.err);
        }
        const removeImage = await this.assetService.deleteFile(getBlog.value.image);
        if (removeImage.isError()) {
            await this.blogDatabaseProvider.createBlog(getBlog.value);
            return (0, result_1.Err)(removeImage.err);
        }
        return (0, result_1.Ok)(res.value);
    }
};
exports.BlogService = BlogService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogService.prototype, "createBlog", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogService.prototype, "getBlogById", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogService.prototype, "getBlogList", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogService.prototype, "updateBlog", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogService.prototype, "deleteBlog", null);
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(blog_provider_1.BLOG_DATABASE_PROVIDER)),
    __param(1, (0, common_1.Inject)(storage_provider_1.ASSET_STORAGE_PROVIDER)),
    __metadata("design:paramtypes", [Object, Object])
], BlogService);
//# sourceMappingURL=blog.service.js.map