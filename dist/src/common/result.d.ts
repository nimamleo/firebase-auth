import { GenericStatusCodes } from './enums/status.enum';
import { GenericError } from './error/generic-error.model';
export declare class Result<T> {
    private readonly _value;
    private readonly _error;
    constructor(_value: T, _error: GenericError);
    get value(): T;
    get err(): GenericError;
    isOK(): boolean;
    isError(): boolean;
}
export declare function Ok<T>(value: T): Result<T>;
export declare function Err(e: GenericError | Error | string, code?: GenericStatusCodes): Result<any>;
