import { Controller, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { AdminUserService } from '../service/user.service';
import { AllUserDto } from '../dtos/user.dto';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { AdminDashboardService } from '../service/dashboard.service';

@Controller('admin/dashboard')
export class AdminDashboardController extends CoreController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {
    super();
  }

  @Get('')
  async dashboard(
    @Res({ passthrough: true }) res: Response,
    @Query() query: CoreSearchFilterDatePaginationDto,
  ) {
    const resp = await this.adminDashboardService.dashboard(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
