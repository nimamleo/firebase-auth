"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    constructor(page, pageSize) {
        this.page = 1;
        this.pageSize = 15;
        const pageNum = Number(page);
        if (!isNaN(pageNum) && pageNum > 0) {
            this.page = pageNum;
        }
        const pageSizeNum = Number(pageSize);
        if (!isNaN(pageSizeNum) && pageSizeNum > 1 && pageSizeNum <= 100) {
            this.pageSize = pageSizeNum;
        }
    }
    getPage() {
        return this.page;
    }
    getPageSize() {
        return this.pageSize;
    }
    getLimit() {
        return this.pageSize;
    }
    getSkip() {
        return (this.page - 1) * this.pageSize;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.model.js.map