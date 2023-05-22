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
} from '@nestjs/common';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { CoreController } from 'src/common/core/controller.core';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';

@Controller('beneficiary')
export class BeneficiaryController extends CoreController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {
    super();
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createBeneficiary(
    @Body() dto: CreateBeneficiaryDto,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.beneficiaryService.createBeneficiary(dto, currentUser._id);
    return this.responseSuccess(res, '00', 'Success', dto, HttpStatus.CREATED);
  }

  @Get('/view')
  @UseGuards(AuthGuard)
  async fetchBeneficiary(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.beneficiaryService.fetchBeneficiary(
      currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Delete('/remove/:id')
  @UseGuards(AuthGuard)
  async removeBeneficiary(
    @CurrentUser() currentUser: IJWTUser,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.beneficiaryService.removeBeneficiary(
      currentUser._id,
      id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
