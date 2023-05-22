import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { CoreController } from 'src/common/core/controller.core';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { RoleEnum } from 'src/user/user.enum';
import { DashboardService } from './dashboard.service';
import { ChartQueryDto } from './dto/chart-query.dto';

@Controller('dashboard')
export class DashboardController extends CoreController {
  constructor(private readonly service: DashboardService) {
    super();
  }

  @Get('matrics')
  @UseGuards(AuthGuard)
  async getDashboardMatrix(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.getDashboardMatrix(
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('tables')
  @UseGuards(AuthGuard)
  async getDashboardTables(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.getDashboardTables(
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('chart')
  @UseGuards(AuthGuard)
  async getDashboardChart(
    @CurrentUser() currentUser: IJWTUser,
    @Query() data: ChartQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.getChartData(
      data.type,
      data.year,
      data.param,
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('profile/tables')
  @UseGuards(AuthGuard)
  async getProfileTables(
    @CurrentUser() currentUser: IJWTUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.getProfileTables(
      currentUser.role == RoleEnum.SUPERADMIN ? null : currentUser._id,
    );
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
