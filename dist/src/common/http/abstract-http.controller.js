"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractHttpController = void 0;
const std_response_model_1 = require("../std-response/std-response.model");
const status_enum_1 = require("../enums/status.enum");
class AbstractHttpController {
    sendResult(response, data) {
        const stdResponse = std_response_model_1.StdResponse.fromResult(data);
        response
            .status(stdResponse.status)
            .send({ ...stdResponse, status: status_enum_1.GenericStatusCodes[stdResponse.status] });
    }
}
exports.AbstractHttpController = AbstractHttpController;
//# sourceMappingURL=abstract-http.controller.js.map