import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import {
  ChangeSubscriptionSettingStateDto,
  CreateSubscriptionSettingDto,
  FetchSubscriptionSettingFilterDto,
} from '../dto/create-subscription-setting.dto';
import { SubscriptionSettingService } from '../services/subscription-setting.service';

@Controller('subscription-setting')
export class SubscriptionSettingController extends CoreController {
  constructor(private readonly service: SubscriptionSettingService) {
    super();
  }

  @Post('/create')
  async createSubscriptionSetting(
    @Body() dto: CreateSubscriptionSettingDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.service.createSubscriptionSetting(dto);
    return this.responseSuccess(res, '00', 'Success', dto, HttpStatus.CREATED);
  }

  @Get('')
  async fetchSubscriptionSetting(
    @Query() filterDto: FetchSubscriptionSettingFilterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.fetchSubscriptionSetting(
      filterDto.status || null,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }

  @Put(':id')
  async changeSubscriptionSettingState(
    @Param('id') id: string,
    @Body() dto: ChangeSubscriptionSettingStateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.changeSubscriptionSettingState(id, dto);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }
}
