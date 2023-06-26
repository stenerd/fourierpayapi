import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { JobService } from './job.service';
export declare class JobController extends CoreController {
    private readonly service;
    constructor(service: JobService);
    paymentLinkStatus(data: string, res: Response): Promise<void>;
}
