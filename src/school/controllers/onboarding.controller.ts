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
import { SchoolOnboardingDto } from '../dtos/onboarding.dto';
import { SchoolOnboardingService } from '../services/onboarding.service';
import { SchoolSessionService } from 'src/school-session/school-session.service';

@Controller('schools')
export class SchoolOnboadingController extends CoreController {
  constructor(
    private readonly service: SchoolOnboardingService,
    private readonly linkService: LinkService,
    private readonly schoolSessionService: SchoolSessionService,
  ) {
    super();
  }

  @Post('/onboarding')
  async registration(
    @Body() schoolOnboardingDto: SchoolOnboardingDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.service.createAccount(schoolOnboardingDto);
    await this.linkService.createDefaultLinks(data.user._id, 10);
    await this.schoolSessionService.onboardingSchoolSession(data.school._id);
    return this.responseSuccess(
      res,
      '00',
      'Success',
      schoolOnboardingDto,
      HttpStatus.CREATED,
    );
  }
}
