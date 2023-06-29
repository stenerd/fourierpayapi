import { Controller, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { AdminTransactionService } from '../service/transaction.service';
import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';

@Controller('admin/transactions')
export class AdminTransactionController extends CoreController {
  constructor(
    private readonly adminTransactionService: AdminTransactionService,
  ) {
    super();
  }

  @Get('')
  async transactions(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewTransactionDto,
  ) {
    const resp = await this.adminTransactionService.transactions(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('charges')
  async charges(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewTransactionDto,
  ) {
    const resp = await this.adminTransactionService.charges(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('charges/count')
  async chargesCount(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewTransactionDto,
  ) {
    const resp = await this.adminTransactionService.chargesCount(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('count')
  async transactionsCount(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewTransactionDto,
  ) {
    const resp = await this.adminTransactionService.transactionsCount(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
