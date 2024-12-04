import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { Response } from 'express';
import { CreateBlogRequest } from './models/create-blog.model';
import { BlogService } from '../../../../application/services/blog.service';
import { UpdateBlogRequest } from './models/update-blog.model';
export declare class BlogHttpController extends AbstractHttpController {
    private readonly blogService;
    constructor(blogService: BlogService);
    createBlog(response: Response, body: CreateBlogRequest, file: Express.Multer.File): Promise<void>;
    getBlogById(response: Response, blogId: string): Promise<void>;
    getBlogList(response: Response, page: number): Promise<void>;
    deleteBlog(response: Response, blogId: string): Promise<void>;
    updateBlog(response: Response, body: UpdateBlogRequest, blogId: string, file: Express.Multer.File): Promise<void>;
}
