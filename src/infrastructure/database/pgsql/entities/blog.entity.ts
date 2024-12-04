import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBlog, IBlogEntity } from '../../../../models/blog.model';

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIBlog(iBlog: IBlog): BlogEntity {
    if (!iBlog) {
      return null;
    }

    const blog = new BlogEntity();

    blog.title = iBlog.title;
    blog.content = iBlog.content;
    blog.image = iBlog.image;

    return blog;
  }

  static toIBlogEntity(blog: BlogEntity): IBlogEntity {
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
}
