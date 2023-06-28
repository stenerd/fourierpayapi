import { Controller, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { AdminTransactionService } from '../service/transaction.service';
import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';
import { AdminWithdrawalService } from '../service/withdrawal.service';

@Controller('admin/withdrawals')
export class AdminWithdrawalController extends CoreController {
  constructor(private readonly adminWithdrawalService: AdminWithdrawalService) {
    super();
  }

  @Get('')
  async withdrawals(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewTransactionDto,
  ) {
    const resp = await this.adminWithdrawalService.withdrawals(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
