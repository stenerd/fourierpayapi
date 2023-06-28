import { Controller, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';
import { AdminPaymentLinkService } from '../service/payment-link.service';
import { ViewPaymentLinkDto } from 'src/payment-link/dto/create-payment-link.dto';

@Controller('admin/payment-links')
export class AdminPaymentLinkController extends CoreController {
  constructor(
    private readonly adminPaymentLinkService: AdminPaymentLinkService,
  ) {
    super();
  }

  @Get('')
  async paymentLinks(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewPaymentLinkDto,
  ) {
    const resp = await this.adminPaymentLinkService.paymentLinks(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
