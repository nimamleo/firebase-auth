import { IPaginatedResult } from "./paginated-result.interface";
import { ILimitation } from "./limitation.interface";
export declare class PaginationResult<T> implements IPaginatedResult<T> {
    total: number;
    page: number;
    pageSize: number;
    list: T[];
    constructor(list: T[], total: number, limitation: ILimitation);
}
