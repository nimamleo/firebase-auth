"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserId = void 0;
const common_1 = require("@nestjs/common");
exports.GetUserId = (0, common_1.createParamDecorator)((data, exc) => {
    const request = exc.switchToHttp().getRequest();
    return request['userId'];
});
//# sourceMappingURL=get-user-id.decorator.js.map