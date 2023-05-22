import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { PaystackService } from './paystack.service';
import { ResolveAccountNumberDto } from './dto/resolve-account-number.dto';

@Controller('paystack')
export class PaystackController extends CoreController {
  constructor(private readonly paystackService: PaystackService) {
    super();
  }

  @Get('/bank-list')
  async fetchBankList(@Res({ passthrough: true }) res: Response) {
    const bank_list = await this.paystackService.fetchBankList();
    return this.responseSuccess(res, '00', 'Success', bank_list, HttpStatus.OK);
  }

  @Get('/resolve-account-number')
  async resolveAccountNumber(
    @Res({ passthrough: true }) res: Response,
    @Query() dto: ResolveAccountNumberDto,
  ) {
    const bank_list = await this.paystackService.resolveAccountNumber(dto);
    return this.responseSuccess(res, '00', 'Success', bank_list, HttpStatus.OK);
  }
}
