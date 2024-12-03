export declare class Pagination {
    private readonly page;
    private readonly pageSize;
    constructor(page: any, pageSize?: any);
    getPage(): number;
    getPageSize(): number;
    getLimit(): number;
    getSkip(): number;
}
