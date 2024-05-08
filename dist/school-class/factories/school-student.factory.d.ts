import { IGetStartAndEndYearResponse, ISchoolTermPayload } from '../interfaces/school-session.interface';
export declare class SchoolTermFactory {
    createNew(data: ISchoolTermPayload): Record<string, any>[];
    getStartAndEndYear(): IGetStartAndEndYearResponse;
}
