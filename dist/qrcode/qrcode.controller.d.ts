import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { QRCodeService } from './qrcode.service';
export declare class QRCodeController extends CoreController {
    private readonly service;
    constructor(service: QRCodeService);
    generateQRCode(data: string, res: Response): Promise<void>;
}
