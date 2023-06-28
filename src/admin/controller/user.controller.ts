import { Controller, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { AdminUserService } from '../service/user.service';
import { AllUserDto } from '../dtos/user.dto';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';

@Controller('admin/users')
export class AdminUserController extends CoreController {
  constructor(private readonly adminUserService: AdminUserService) {
    super();
  }

  @Get('')
  async allUsers(
    @Query() query: AllUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.adminUserService.allUsers(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('all-count')
  async allCountUsers(@Res({ passthrough: true }) res: Response) {
    const resp = await this.adminUserService.allCountUsers();
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }

  @Get('count')
  async countUsers(
    @Res({ passthrough: true }) res: Response,
    @Query() query: CoreSearchFilterDatePaginationDto,
  ) {
    const resp = await this.adminUserService.countUsers(query);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
