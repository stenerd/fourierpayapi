import { BadRequestException, Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeService {
  constructor() {}

  async generateQRCode(data: string): Promise<any> {
    const qrCode = await QRCode.toDataURL(data);
    return qrCode;
  }
}
