import { CoreService } from 'src/common/core/service.core';
import { SchoolSessionRepository } from './repositories/school-session.repository';
import { SchoolSessionSettingRepository } from './repositories/school-session-setting.repository';
import { SchoolSessionFactory } from './factories/school-session.factory';
import { ICreateSchoolSessionResponse, ISchoolSessionPayload } from './interfaces/school-session.interface';
import { SchoolTermRepository } from './repositories/school-term.repository';
import { SchoolTermFactory } from './factories/school-term.factory';
import { SchoolSessionSettingFactory } from './factories/school-session-setting.factory';
export declare class SchoolSessionService extends CoreService<SchoolSessionRepository> {
    private readonly repository;
    private readonly schoolSessionSettingRepository;
    private readonly schoolTermRepository;
    private readonly factory;
    private readonly schoolTermFactory;
    private readonly schoolSessionSettingFactory;
    constructor(repository: SchoolSessionRepository, schoolSessionSettingRepository: SchoolSessionSettingRepository, schoolTermRepository: SchoolTermRepository, factory: SchoolSessionFactory, schoolTermFactory: SchoolTermFactory, schoolSessionSettingFactory: SchoolSessionSettingFactory);
    createSchoolSession(payload: ISchoolSessionPayload): Promise<ICreateSchoolSessionResponse>;
    onboardingSchoolSession(school_id: string): Promise<ICreateSchoolSessionResponse>;
}
