"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
exports.Ok = Ok;
exports.Err = Err;
const status_enum_1 = require("./enums/status.enum");
const generic_error_model_1 = require("./error/generic-error.model");
class Result {
    constructor(_value, _error) {
        this._value = _value;
        this._error = _error;
        if (this.isError() && this.isOK()) {
            this._value = null;
        }
        if (!this.isError() && !this.isOK()) {
            this._error = new generic_error_model_1.GenericError('Unknown error', status_enum_1.GenericStatusCodes.INTERNAL);
        }
    }
    get value() {
        if (this.isError()) {
            throw this._error._err;
        }
        return this._value;
    }
    get err() {
        if (this.isOK()) {
            throw new generic_error_model_1.GenericError(`Result has value: ${this._value}`, status_enum_1.GenericStatusCodes.INTERNAL);
        }
        return this._error;
    }
    isOK() {
        return this._value !== undefined && this._value !== null;
    }
    isError() {
        return !!this._error;
    }
}
exports.Result = Result;
function Ok(value) {
    return new Result(value, null);
}
function Err(e, code) {
    if (e instanceof generic_error_model_1.GenericError) {
        return new Result(null, e);
    }
    if (e instanceof String || typeof e === 'string') {
        return new Result(null, new generic_error_model_1.GenericError(new Error(e), code));
    }
    return new Result(null, new generic_error_model_1.GenericError(e, code));
}
//# sourceMappingURL=result.js.map