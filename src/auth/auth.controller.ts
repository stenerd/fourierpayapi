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
import { CoreController } from 'src/common/core/controller.core';
import { LinkService } from 'src/link/link.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController extends CoreController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly linkService: LinkService,
  ) {
    super();
  }

  @Post('/registration')
  async registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.create(createUserDto);
    await this.linkService.createDefaultLinks(user._id, 10);
    return this.responseSuccess(
      res,
      '00',
      'Success',
      createUserDto,
      HttpStatus.CREATED,
    );
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.authService.login(loginDto);
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }

  @Get('/confirm-email/:token')
  async confirmEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.confirmEmail(token);
    return this.responseSuccess(res, '00', 'Success', user, HttpStatus.OK);
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.forgotPassword(dto.email);
    return this.responseSuccess(res, '00', 'Success', result, HttpStatus.OK);
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token,
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.resetPassword(token, {
      ...resetPasswordDto,
    });

    return this.responseSuccess(res, '00', 'Success', user, HttpStatus.OK);
  }
}
