import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { LinkService } from 'src/link/link.service';
import { SchoolOnboardingDto } from '../dtos/onboarding.dto';
import { SchoolOnboardingService } from '../services/onboarding.service';
import { SchoolSessionService } from 'src/school-session/school-session.service';
export declare class SchoolOnboadingController extends CoreController {
    private readonly service;
    private readonly linkService;
    private readonly schoolSessionService;
    constructor(service: SchoolOnboardingService, linkService: LinkService, schoolSessionService: SchoolSessionService);
    registration(schoolOnboardingDto: SchoolOnboardingDto, res: Response): Promise<void>;
}
