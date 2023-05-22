"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
let CloudinaryService = class CloudinaryService {
    async uploadFile(file, folderName) {
        return new Promise((resolve, reject) => {
            console.log('file >> ', file, folderName);
            const upload = cloudinary_1.v2.uploader.upload_stream({
                resource_type: 'raw',
                public_id: `${folderName}/${file.originalname}`,
                overwrite: true,
            }, (error, result) => {
                if (error) {
                    console.log('error >> ', error);
                    reject(new common_1.BadRequestException(error));
                }
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async deleteFile(publicId) {
        try {
            const deleted = await cloudinary_1.v2.uploader.destroy(`${publicId}`, {
                invalidate: true,
            });
            return deleted;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map