"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResult = void 0;
class PaginationResult {
    constructor(list, total, limitation) {
        this.list = list;
        this.total = total;
        this.pageSize = limitation.limit;
        this.page = isNaN(limitation.skip / limitation.limit + 1)
            ? 1
            : limitation.skip / limitation.limit + 1;
    }
}
exports.PaginationResult = PaginationResult;
//# sourceMappingURL=paginatio-result.js.map