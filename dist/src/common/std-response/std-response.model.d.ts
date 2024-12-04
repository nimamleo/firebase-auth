import { Result } from '../result';
import { GenericStatusCodes } from '../enums/status.enum';
export declare class StdResponse<T> {
    status: number;
    message: string;
    data: T;
    constructor(message: string, status: GenericStatusCodes, data: T);
    static fromResult<T>(result: Result<T>, message?: string): StdResponse<T>;
}
