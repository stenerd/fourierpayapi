import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IJWTUser } from 'src/auth/auth.interface';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { RoleEnum } from 'src/user/user.enum';
import { ViewTransactionDto } from './dto/view-transaction.dto';

@Controller('transaction')
export class TransactionController extends CoreController {
  constructor(private readonly transactionService: TransactionService) {
    super();
  }

  @Get('/generate-reference')
  async generateReference(@Res({ passthrough: true }) res: Response) {
    const resp = await this.transactionService.generateReference();
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getTransaction(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() currentUser: IJWTUser,
    @Query() query: ViewTransactionDto,
  ) {
    const resp = await this.transactionService.getTransaction(
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
      query,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
