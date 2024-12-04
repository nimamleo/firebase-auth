import { AbstractHttpController } from '../../../../common/http/abstract-http.controller';
import { Response } from 'express';
export declare class BlogHttpController extends AbstractHttpController {
    constructor();
    createBlog(response: Response, body: any): Promise<void>;
}
