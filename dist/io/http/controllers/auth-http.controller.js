"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHttpController = void 0;
const common_1 = require("@nestjs/common");
const abstract_http_controller_1 = require("../../../common/http/abstract-http.controller");
let AuthHttpController = class AuthHttpController extends abstract_http_controller_1.AbstractHttpController {
    constructor() {
        super();
    }
    async register() { }
};
exports.AuthHttpController = AuthHttpController;
__decorate([
    (0, common_1.Post)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthHttpController.prototype, "register", null);
exports.AuthHttpController = AuthHttpController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [])
], AuthHttpController);
//# sourceMappingURL=auth-http.controller.js.map