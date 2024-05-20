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
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { IJWTUser } from 'src/auth/auth.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentSubscription } from 'src/common/decorators/current-subscription.decorator';
import { Subscription } from 'src/subscription/models/subscription.model';
import { GetSubscriptionData } from 'src/common/decorators/get-subscription-metadata.decorator';
import { ResetUserPasswordDto } from 'src/auth/dto/create-auth.dto';

@Controller('user')
export class UserController extends CoreController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('/create-super-admin')
  async createSuperAcount(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.userService.createSuperAcount(dto);
    return this.responseSuccess(res, '00', 'Success', dto, HttpStatus.CREATED);
  }

  @Put('/edit')
  @UseGuards(AuthGuard)
  async updateUser(
    @Body() dto: UpdateUserDto,
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.userService.updateUser(dto, currentUser._id);
    return this.responseSuccess(res, '00', 'Success', dto, HttpStatus.ACCEPTED);
  }

  @Get('/profile')
  @GetSubscriptionData('Get')
  @UseGuards(AuthGuard)
  async profile(
    @CurrentUser() currentUser: IJWTUser,
    @CurrentSubscription() currentSubscription: Subscription,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('currentSubscription >> ', currentSubscription);
    const user = await this.userService.profile(currentUser._id);
    return this.responseSuccess(
      res,
      '00',
      'Success',
      user,
      HttpStatus.ACCEPTED,
    );
  }
   
  @Post("reset_password")   
  @UseGuards(AuthGuard)
  async resetPassword(@Body() reset: ResetUserPasswordDto, @CurrentUser() currentUser: IJWTUser, @Res({ passthrough: true }) res: Response) {
    const user = await this.userService.resetUserPassword(reset, currentUser._id)
    return this.responseSuccess(
      res,
      '00',
      'Success',
      user,
      HttpStatus.ACCEPTED,
    );
  }
}
