"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC = exports.RBAC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.RBAC_KEY = 'rbac';
const RBAC = (...roles) => (0, common_1.SetMetadata)('rbac', roles);
exports.RBAC = RBAC;
//# sourceMappingURL=rbac.decorator.js.map