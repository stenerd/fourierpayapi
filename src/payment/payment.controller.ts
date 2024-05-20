import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CoreController } from 'src/common/core/controller.core';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { InitializePaymentDto } from './dto/initialize-payment.dto';
import { Response } from 'express';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IJWTUser } from 'src/auth/auth.interface';
import { RoleEnum } from 'src/user/user.enum';
import { ViewPaymentDto } from './dto/view-payment.dto';

@Controller('payment')
export class PaymentController extends CoreController {
  constructor(private readonly paymentService: PaymentService) {
    super();
  }

  @Post('/initialize')
  async initializePayment(
    @Body() initializePaymentDto: InitializePaymentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.paymentService.initializePayment(
      initializePaymentDto,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }

  @Post('/verify')
  async verifyPayment(
    @Body() dto: VerifyPaymentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.paymentService.verifyPayment(dto);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }

  @Put('/abandon')
  async abandonPayment(
    @Body() dto: VerifyPaymentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.paymentService.abandonPayment(dto);
    return this.responseSuccess(
      res,
      '00',
      'Success',
      resp,
      HttpStatus.ACCEPTED,
    );
  }

  @Get('/:code')
  @UseGuards(AuthGuard)
  async getPaymentLink(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
    @Param('code') code: string,
    @Query() query: ViewPaymentDto,
  ) {
    const resp = await this.paymentService.getPaymentByCode(code || '', query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('/external-link/:code')
  async getExternalPayment(
    @Res({ passthrough: true }) res: Response,
    @Param('code') code: string,
    @Query() query: ViewPaymentDto,
  ) {
    const resp = await this.paymentService.getExternalPayment(
      code || '',
      query,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('/verify/:code/:unique_answer')
  async singlePaymentVerification(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
    @Param('unique_answer') unique_answer: string,
  ) {
    const resp = await this.paymentService.singlePaymentVerification(
      code,
      unique_answer,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('/reciept/:reference')
  async getPaymentReference(
    @Res({ passthrough: true }) res: Response,
    @Param('reference') reference: string,
  ) {
    const resp = await this.paymentService.getPaymentReference(reference || '');
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
