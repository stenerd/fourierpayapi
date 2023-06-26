import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { CoreController } from 'src/common/core/controller.core';
import { Request, Response } from 'express';
import { JobService } from './job.service';

@Controller('job')
export class JobController extends CoreController {
  constructor(private readonly service: JobService) {
    super();
  }

  @Get('/payment-link-status')
  async paymentLinkStatus(
    @Query('data') data: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resp = await this.service.paymentLinkStatusJob();
    return this.responseSuccess(res, '00', 'Success', resp, HttpStatus.CREATED);
  }
}
