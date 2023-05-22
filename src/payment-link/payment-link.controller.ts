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
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';
import {
  ChangePaymentLinkStateDto,
  ChangePaymentLinkStatusDto,
  CreatePaymentLinkDto,
} from './dto/create-payment-link.dto';
import { UpdatePaymentLinkDto } from './dto/update-payment-link.dto';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { User } from 'src/user/user.model';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IJWTUser, UserRequest } from 'src/auth/auth.interface';
import { RoleEnum } from 'src/user/user.enum';
import { PaymentLinkStateEnum } from './payment-link.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { ViewPaymentDto } from 'src/payment/dto/view-payment.dto';

@Controller('payment-link')
export class PaymentLinkController extends CoreController {
  constructor(private readonly paymentLinkService: PaymentLinkService) {
    super();
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createPaymentLink(
    @Body() createUserDto: CreatePaymentLinkDto,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.paymentLinkService.createPaymentLink(
      createUserDto,
      currentUser._id,
    );
    return this.responseSuccess(
      res,
      '00',
      'Success',
      createUserDto,
      HttpStatus.CREATED,
    );
  }

  @Put('/change-status/:code')
  @UseGuards(AuthGuard)
  async changePaymentLinkStatus(
    @Body() dto: ChangePaymentLinkStatusDto,
    @CurrentUser() currentUser: IJWTUser,
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.paymentLinkService.changePaymentLinkStatus(
      dto,
      code,
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', dto, HttpStatus.ACCEPTED);
  }

  @Put('/set-public/:code')
  @UseGuards(AuthGuard)
  async changePaymentLinkToPublicState(
    @CurrentUser() currentUser: IJWTUser,
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.paymentLinkService.changePaymentLinkToPublicState(
      code,
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', {}, HttpStatus.ACCEPTED);
  }

  @Post('/set-private/:code')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async changePaymentLinkToPrivateState(
    @CurrentUser() currentUser: IJWTUser,
    @UploadedFile() file,
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.paymentLinkService.changePaymentLinkToPrivateState(
      file,
      code,
      currentUser._id,
      file.buffer,
    );
    return this.responseSuccess(res, '00', 'Success', {}, HttpStatus.CREATED);
  }

  @Get('/:code/payers-sheet')
  @UseGuards(AuthGuard)
  async getPayerSheet(
    @CurrentUser() currentUser: IJWTUser,
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewPaymentDto,
  ) {
    const resp = await this.paymentLinkService.getPayerSheet(
      code,
      query,
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Put('/:code/change-public-link-state')
  @UseGuards(AuthGuard)
  async activatePublicLink(
    @CurrentUser() currentUser: IJWTUser,
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.paymentLinkService.activatePublicLink(
      code,
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getPaymentLink(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.paymentLinkService.getPaymentLink(
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('/:code')
  async singlePaymentLink(
    @Res({ passthrough: true }) res: Response,
    @Param('code') code: string,
  ) {
    const resp = await this.paymentLinkService.singlePaymentLink(code);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
