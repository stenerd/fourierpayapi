import { Module } from '@nestjs/common';
import { QRCodeController } from './qrcode.controller';
import { QRCodeService } from './qrcode.service';

@Module({
  imports: [],
  controllers: [QRCodeController],
  providers: [QRCodeService],
  exports: [QRCodeService],
})
export class QRCodeModule {}
