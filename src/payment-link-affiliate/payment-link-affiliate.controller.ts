import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { PaymentLinkAffiliateService } from './payment-link-affiliate.service';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UpdatePaymentAffiliateDto } from './dto/update-payment-affiliate.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IJWTUser } from 'src/auth/auth.interface';
import { RoleEnum } from 'src/user/user.enum';

@Controller('payment-link-affiliate')
export class PaymentLinkAffiliateController extends CoreController {
  constructor(
    private readonly paymentLinkAffiliateService: PaymentLinkAffiliateService,
  ) {
    super();
  }

  // Create participation (when affiliate starts sharing a link)
  @Post('/')
  @UseGuards(AuthGuard)
  async create(
    @Body() dto: CreatePaymentAffiliateDto,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.paymentLinkAffiliateService.createParticipation(
      dto,
      currentUser._id,
    );
    return this.responseSuccess(
      res,
      '00',
      'Participation created successfully',
      result,
      HttpStatus.CREATED,
    );
  }

  // Get all participation for a specific payment link (merchant view)
  @Get('/link/:paymentLinkId')
  @UseGuards(AuthGuard)
  async getByLink(
    @Param('paymentLinkId') paymentLinkId: string,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.paymentLinkAffiliateService.getByPaymentLink(
      paymentLinkId,
      currentUser.role === RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', result, HttpStatus.OK);
  }

  // Get all links an affiliate is participating in + earnings
  @Get('/affiliate/:affiliateId')
  @UseGuards(AuthGuard)
  async getByAffiliate(
    @Param('affiliateId') affiliateId: string,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.paymentLinkAffiliateService.getByAffiliate(
      affiliateId,
    );
    return this.responseSuccess(res, '00', 'Success', result, HttpStatus.OK);
  }

  @Get('/dashboard')
  @UseGuards(AuthGuard)
  async getDashboard(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.paymentLinkAffiliateService.getDashboardData(
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }
}
