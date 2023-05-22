import { Controller } from '@nestjs/common';
import { LinkService } from './link.service';
import { CoreController } from 'src/common/core/controller.core';

@Controller('link')
export class LinkController extends CoreController {
  constructor(private readonly service: LinkService) {
    super();
  }
}
