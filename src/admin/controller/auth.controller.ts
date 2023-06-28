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
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CoreController } from 'src/common/core/controller.core';
import { LinkService } from 'src/link/link.service';
import { UserService } from 'src/user/user.service';
import { AdminAuthService } from '../service/auth.service';

@Controller('admin/auth')
export class AdminAuthController extends CoreController {
  constructor(private readonly authService: AdminAuthService) {
    super();
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.authService.login(loginDto);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.OK);
  }
}
