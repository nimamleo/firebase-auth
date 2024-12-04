import { GenericStatusCodes } from "../enums/status.enum";
export declare class GenericError {
    _message: string;
    _code: GenericStatusCodes;
    _err: Error;
    constructor(err: Error | any, code?: GenericStatusCodes);
}
