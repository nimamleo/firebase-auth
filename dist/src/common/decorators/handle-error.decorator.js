"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = HandleError;
const common_1 = require("@nestjs/common");
const result_1 = require("../result");
const errorLogger = new common_1.Logger('HandleError');
function HandleError(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        try {
            return await originalMethod.apply(this, args);
        }
        catch (error) {
            if (typeof error === 'string') {
                error = new Error(error);
            }
            errorLogger.error(`Error in ${_methodName}@${_target.constructor.name}: ${error.name} ${error.message}`, error.stack, _target.constructor.name);
            return (0, result_1.Err)(error);
        }
    };
}
//# sourceMappingURL=handle-error.decorator.js.map