import { UserService } from 'src/user/user.service';
import { SchoolOnboardingDto } from '../dtos/onboarding.dto';
import { SchoolDataService } from 'src/school-data/school-data.service';
import { SchoolOnboardingFactory } from '../factories/onboarding.factory';
import { ISchoolOnboardingResponse } from '../interfaces/onboarding.interface';
export declare class SchoolOnboardingService {
    private readonly userService;
    private readonly schoolDataService;
    private readonly factory;
    constructor(userService: UserService, schoolDataService: SchoolDataService, factory: SchoolOnboardingFactory);
    createAccount(data: SchoolOnboardingDto): Promise<ISchoolOnboardingResponse>;
}
