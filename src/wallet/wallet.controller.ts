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

  @Post('/webhook')
  async webhook(
    @Res({ passthrough: true }) res: Response,
    @Body() body: Record<string, any>,
  ) {
    console.log('body >> ', body);

    await this.walletService.webhook(body);

    const { event, data } = body;
    // const wallet = await this.walletService.create({
    //   user_id: currentUser._id,
    //   amount: 0,
    // });

    //   {
    // event: 'transfer.success',
    // data: {
    //   amount: 200000,
    //   createdAt: '2023-06-11T16:04:59.000Z',
    //   currency: 'NGN',
    //   domain: 'live',
    //   failures: null,
    //   id: 302108292,
    //   integration: {
    //     id: 1009211,
    //     is_live: true,
    //     business_name: 'Stenerd Technologies',
    //     logo_path: 'https://public-files-paystack-prod.s3.eu-west-1.amazonaws.com/integration-logos/paystack.jpg'
    //   },
    //   reason: 'Transfer',
    //   reference: '5ncs38yzqws5-3yu29z9',
    //   source: 'balance',
    //   source_details: null,
    //   status: 'success',
    //   titan_code: null,
    //   transfer_code: 'TRF_ycq3ehig8nzr47r2',
    //   transferred_at: '2023-06-11T16:05:00.000Z',
    //   updatedAt: '2023-06-11T16:05:00.000Z',
    //   recipient: {
    //     active: true,
    //     createdAt: '2023-06-08T06:50:00.000Z',
    //     currency: 'NGN',
    //     description: null,
    //     domain: 'live',
    //     email: null,
    //     id: 55255167,
    //     integration: 1009211,
    //     metadata: [Object],
    //     name: 'CHINEDU CHUKWUEMEKA IFEDIORAH',
    //     recipient_code: 'RCP_9a6hgrkgfj3gx0u',
    //     type: 'nuban',
    //     updatedAt: '2023-06-11T16:04:58.000Z',
    //     is_deleted: false,
    //     details: [Object]
    //   },
    //   session: { provider: 'nip', id: '110006230611160459030210829201' },
    //   fee_charged: 0
    // }
    //   }

    return this.responseSuccess(res, '00', 'Success', {}, HttpStatus.CREATED);
  }
}
