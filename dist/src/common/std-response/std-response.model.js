"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdResponse = void 0;
const status_enum_1 = require("../enums/status.enum");
class StdResponse {
    constructor(message, status, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
    static fromResult(result, message = '') {
        if (result.isOK()) {
            return new StdResponse(message, status_enum_1.GenericStatusCodes.Ok, result.value);
        }
        if (result.isError()) {
            return new StdResponse(result.err._err.message, result.err._code, null);
        }
    }
}
exports.StdResponse = StdResponse;
//# sourceMappingURL=std-response.model.js.map