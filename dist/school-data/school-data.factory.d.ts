import { SchoolOnboardingDto } from 'src/school/dtos/onboarding.dto';
import { SchoolData } from './school-data.model';
export declare class SchoolDataFactory {
    createNew(data: SchoolOnboardingDto): SchoolData;
}
