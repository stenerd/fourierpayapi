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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeController = void 0;
const common_1 = require("@nestjs/common");
const controller_core_1 = require("../common/core/controller.core");
const qrcode_service_1 = require("./qrcode.service");
let QRCodeController = class QRCodeController extends controller_core_1.CoreController {
    constructor(service) {
        super();
        this.service = service;
    }
    async generateQRCode(data, res) {
        const resp = await this.service.generateQRCode(data);
        res.header('Content-Type', 'image/png');
        console.log('buf >> ', Buffer.from(resp.replace(/^data:image\/png;base64,/, ''), 'base64'));
        res.send(Buffer.from(resp.replace(/^data:image\/png;base64,/, ''), 'base64'));
    }
};
__decorate([
    (0, common_1.Get)('/generate'),
    __param(0, (0, common_1.Query)('data')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QRCodeController.prototype, "generateQRCode", null);
QRCodeController = __decorate([
    (0, common_1.Controller)('qrcode'),
    __metadata("design:paramtypes", [qrcode_service_1.QRCodeService])
], QRCodeController);
exports.QRCodeController = QRCodeController;
//# sourceMappingURL=qrcode.controller.js.map