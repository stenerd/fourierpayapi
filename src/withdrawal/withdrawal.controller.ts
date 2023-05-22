import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { CoreController } from 'src/common/core/controller.core';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { ViewWithdrawalDto } from './withdrawal.dto';
import { WithdrawalService } from './withdrawal.service';

@Controller('withdrawal')
export class WithdrawalController extends CoreController {
  constructor(private readonly withdrawalService: WithdrawalService) {
    super();
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async fetchProfileWithdrawal(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.withdrawalService.fetchProfileWithdrawal(
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('/view')
  @UseGuards(AuthGuard)
  async fetchWithdrawal(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
    @Query() query: ViewWithdrawalDto,
  ) {
    const resp = await this.withdrawalService.fetchWithdrawal(
      currentUser._id,
      query,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
