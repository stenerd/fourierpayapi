import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, walletWithdrawalDto } from './dto/create-wallet.dto';
// import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CoreController } from 'src/common/core/controller.core';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IJWTUser } from 'src/auth/auth.interface';
import { Response } from 'express';

@Controller('wallet')
export class WalletController extends CoreController {
  constructor(private readonly walletService: WalletService) {
    super();
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createWallet(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const wallet = await this.walletService.create({
      user_id: currentUser._id,
      amount: 0,
    });
    return this.responseSuccess(
      res,
      '00',
      'Success',
      wallet,
      HttpStatus.CREATED,
    );
  }

  @Post('/withdraw')
  @UseGuards(AuthGuard)
  async walletWithdraw(
    @CurrentUser() currentUser: IJWTUser,
    @Body() dto: walletWithdrawalDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const wallet = await this.walletService.walletWithdraw(
      dto,
      currentUser._id,
    );
    return this.responseSuccess(
      res,
      '00',
      'Success',
      wallet,
      HttpStatus.CREATED,
    );
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getWallet(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.walletService.getWallet(currentUser._id);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
