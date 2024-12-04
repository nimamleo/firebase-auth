import { IBlog, IBlogEntity } from '../../../../models/blog.model';
export declare class BlogEntity {
    id: number;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    static fromIBlog(iBlog: IBlog): BlogEntity;
    static toIBlogEntity(blog: BlogEntity): IBlogEntity;
}
