import { LinkService } from './link.service';
import { CoreController } from 'src/common/core/controller.core';
export declare class LinkController extends CoreController {
    private readonly service;
    constructor(service: LinkService);
}
