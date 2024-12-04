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
var BlogEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogEntity = void 0;
const typeorm_1 = require("typeorm");
let BlogEntity = BlogEntity_1 = class BlogEntity {
    static fromIBlog(iBlog) {
        if (!iBlog) {
            return null;
        }
        const blog = new BlogEntity_1();
        blog.title = iBlog.title;
        blog.content = iBlog.content;
        blog.image = iBlog.image;
        return blog;
    }
    static toIBlogEntity(blog) {
        if (!blog) {
            return null;
        }
        return {
            id: blog.id.toString(),
            title: blog.title,
            content: blog.content,
            image: blog.image,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        };
    }
};
exports.BlogEntity = BlogEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], BlogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BlogEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BlogEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BlogEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], BlogEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], BlogEntity.prototype, "updatedAt", void 0);
exports.BlogEntity = BlogEntity = BlogEntity_1 = __decorate([
    (0, typeorm_1.Entity)('blog')
], BlogEntity);
//# sourceMappingURL=blog.entity.js.map