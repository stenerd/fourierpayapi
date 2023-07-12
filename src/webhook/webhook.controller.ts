import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController extends CoreController {
  constructor(private readonly walletService: WebhookService) {
    super();
  }

  @Post('')
  async webhook(
    @Res({ passthrough: true }) res: Response,
    @Body() body: Record<string, any>,
  ) {
    console.log('body >> ', body);

    await this.walletService.webhook(body);

    const { event, data } = body;

    return this.responseSuccess(res, '00', 'Success', {}, HttpStatus.CREATED);
  }
  @Get('fix')
  async webhookFix(@Res({ passthrough: true }) res: Response) {
    const resp = await this.walletService.successfulPaymentWebhook({
      reference: 'Tko5Knm4ETE53Lt',
    });

    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
