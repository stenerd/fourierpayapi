import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { CommissionService } from './commission.service';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IJWTUser } from 'src/auth/auth.interface';
import { RoleEnum } from 'src/user/user.enum';

@Controller('commission')
@UseGuards(AuthGuard)
export class CommissionController extends CoreController {
  constructor(private readonly commissionService: CommissionService) {
    super();
  }

  // 1. Affiliate dashboard — earnings + commission history
  @Get('/dashboard')
  async getAffiliateDashboard(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.getAffiliateDashboard(
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }

  // Merchant view: All affiliates with earnings (across all links)
  @Get('/affiliates')
  @UseGuards(AuthGuard)
  async getAllAffiliates(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.getAllAffiliates(currentUser);
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }

  // 2. All commissions for a specific payment link (merchant view)
  @Get('/link/:paymentLinkId')
  async getByPaymentLink(
    @Param('paymentLinkId') paymentLinkId: string,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.getByPaymentLink(
      paymentLinkId,
      currentUser.role === RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }

  // 3. All commissions for a specific affiliate (merchant/admin view)
  @Get('/affiliate/:affiliateId')
  async getByAffiliate(
    @Param('affiliateId') affiliateId: string,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.getByAffiliate(affiliateId);
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }

  // 4. Global list of all commissions (merchant/admin)
  @Get('/')
  async getAll(
    @Query() query: any,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.getAll(query, currentUser);
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }

  // 5. Mark commission as paid (for payouts)
  @Put('/:id/mark-paid')
  async markAsPaid(
    @Param('id') id: string,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.markAsPaid(id, currentUser);
    return this.responseSuccess(
      res,
      '00',
      'Commission marked as paid',
      data,
      HttpStatus.OK,
    );
  }

  // Merchant view: All affiliates who joined a specific payment link + earnings
  @Get('/link/:paymentLinkId/affiliates')
  @UseGuards(AuthGuard)
  async getAffiliatesForLink(
    @Param('paymentLinkId') paymentLinkId: string,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.commissionService.getAffiliatesForLink(
      paymentLinkId,
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', data, HttpStatus.OK);
  }
}
