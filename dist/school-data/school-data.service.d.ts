import { CoreService } from 'src/common/core/service.core';
import { SchoolDataRepository } from './school-data.repository';
import { SchoolOnboardingDto } from 'src/school/dtos/onboarding.dto';
import { SchoolDataFactory } from './school-data.factory';
import { SchoolData } from './school-data.model';
export declare class SchoolDataService extends CoreService<SchoolDataRepository> {
    private readonly repository;
    private readonly factory;
    constructor(repository: SchoolDataRepository, factory: SchoolDataFactory);
    create(data: SchoolOnboardingDto): Promise<SchoolData>;
}
