import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { QRCodeService } from './qrcode.service';

@Controller('qrcode')
export class QRCodeController extends CoreController {
  constructor(private readonly service: QRCodeService) {
    super();
  }

  @Get('/generate')
  async generateQRCode(
    @Query('data') data: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.generateQRCode(data);
    res.header('Content-Type', 'image/png');
    console.log(
      'buf >> ',
      Buffer.from(resp.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );
    res.send(
      Buffer.from(resp.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );
    // return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }
}
