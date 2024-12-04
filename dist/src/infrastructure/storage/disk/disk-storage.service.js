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
exports.DiskStorageService = void 0;
const common_1 = require("@nestjs/common");
const result_1 = require("../../../common/result");
const handle_error_decorator_1 = require("../../../common/decorators/handle-error.decorator");
const generic_error_model_1 = require("../../../common/error/generic-error.model");
const fs = require("fs");
const path = require("path");
let DiskStorageService = class DiskStorageService {
    async createFile(iAsset) {
        iAsset.directoryPath = path.join(__dirname, '../../../../../images');
        iAsset.directoryPath = path.join(iAsset.directoryPath, `${Date.now()}-${iAsset.name.trim()}`);
        const res = await new Promise((resolve, reject) => {
            fs.writeFile(iAsset.directoryPath, iAsset.buffer, (err) => {
                if (err) {
                    reject(new generic_error_model_1.GenericError(err));
                    return;
                }
                resolve(true);
            });
        });
        return (0, result_1.Ok)({
            name: iAsset.name,
            buffer: null,
            mimetype: iAsset.mimetype,
            directoryPath: iAsset.directoryPath,
            size: iAsset.size,
        });
    }
    async deleteFile(filePath) {
        const res = await new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(new generic_error_model_1.GenericError(err));
                    return;
                }
                resolve(true);
            });
        });
        return (0, result_1.Ok)(res);
    }
    serveFile(filePath) {
        throw new Error('no');
    }
};
exports.DiskStorageService = DiskStorageService;
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiskStorageService.prototype, "createFile", null);
__decorate([
    handle_error_decorator_1.HandleError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiskStorageService.prototype, "deleteFile", null);
exports.DiskStorageService = DiskStorageService = __decorate([
    (0, common_1.Injectable)()
], DiskStorageService);
//# sourceMappingURL=disk-storage.service.js.map