import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { LinkService } from 'src/link/link.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import {
  AffiliateRegisterDto,
  AffiliateLoginDto,
} from './dto/affiliate-auth.dto';
import { RoleEnum } from 'src/user/user.enum';

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
    const user = await this.userService.create({
      ...createUserDto,
      role: RoleEnum.ADMIN,
    });
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

  // NEW: Affiliate Registration
  @Post('/affiliate-registration')
  async affiliateRegistration(
    @Body() dto: AffiliateRegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.affiliateRegister(dto);
    return this.responseSuccess(
      res,
      '00',
      'Affiliate registration successful',
      result,
      HttpStatus.CREATED,
    );
  }

  // NEW: Affiliate Login
  @Post('/affiliate-login')
  async affiliateLogin(
    @Body() dto: AffiliateLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.affiliateLogin(dto);
    return this.responseSuccess(
      res,
      '00',
      'Login successful',
      result,
      HttpStatus.OK,
    );
  }

  // Existing: Email confirmation
  @Get('/confirm-email/:token')
  async confirmEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.confirmEmail(token);
    return this.responseSuccess(res, '00', 'Success', user, HttpStatus.OK);
  }

  // Existing: Forgot password
  @Post('/forgot-password')
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.forgotPassword(dto.email);
    return this.responseSuccess(res, '00', 'Success', result, HttpStatus.OK);
  }

  // Existing: Reset password
  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.resetPassword(token, resetPasswordDto);
    return this.responseSuccess(res, '00', 'Success', user, HttpStatus.OK);
  }
}
