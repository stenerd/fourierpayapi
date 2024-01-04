import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { LinkService } from 'src/link/link.service';
import { SchoolOnboardingDto } from '../dtos/onboarding.dto';
import { SchoolOnboardingService } from '../services/onboarding.service';
export declare class SchoolOnboadingController extends CoreController {
    private readonly service;
    private readonly linkService;
    constructor(service: SchoolOnboardingService, linkService: LinkService);
    registration(schoolOnboardingDto: SchoolOnboardingDto, res: Response): Promise<void>;
}
