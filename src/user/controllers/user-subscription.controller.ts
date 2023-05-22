import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { IJWTUser } from 'src/auth/auth.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import {
  FetchSubscriptionSettingFilterDto,
  SubscribeDto,
} from 'src/subscription/dto/create-subscription-setting.dto';

@Controller('user/subscription')
export class UserSubscriptionController extends CoreController {
  constructor(private readonly service: SubscriptionService) {
    super();
  }

  @Get('')
  @UseGuards(AuthGuard)
  async fetchSubscriptions(
    @CurrentUser() currentUser: IJWTUser,
    @Query() query: FetchSubscriptionSettingFilterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const subscriptions = await this.service.fetchSubscriptions(
      currentUser._id,
      query.status || null,
    );
    return this.responseSuccess(
      res,
      '00',
      'Success',
      subscriptions,
      HttpStatus.OK,
    );
  }

  @Post('/subscribe')
  @UseGuards(AuthGuard)
  async subscribe(
    @CurrentUser() currentUser: IJWTUser,
    @Body() dto: SubscribeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.service.subscribe(currentUser._id, dto);
    return this.responseSuccess(res, '00', 'Success', dto, HttpStatus.CREATED);
  }
}
