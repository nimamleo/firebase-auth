import { Result } from '../result';
import { Response } from 'express';
export declare abstract class AbstractHttpController {
    protected sendResult<T>(response: Response, data: Result<T>): void;
}
