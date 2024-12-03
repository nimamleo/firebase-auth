"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
const status_enum_1 = require("../enums/status.enum");
class GenericError {
    constructor(err, code) {
        if (err instanceof Error) {
            this._message = err.message;
            this._err = err;
        }
        else {
            this._message = err;
            this._err = err;
        }
        this._code = code || status_enum_1.GenericStatusCodes.INTERNAL;
    }
}
exports.GenericError = GenericError;
//# sourceMappingURL=generic-error.model.js.map