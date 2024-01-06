import { SchoolSession } from '../models/school-session.model';
import { SchoolTerm } from '../models/school-term.model';
export interface ISchoolSessionPayload {
    school_id: string;
    session_setting_id: string;
}
export interface ISchoolTermPayload {
    school_id: string;
    session_id: string;
    session_setting_id: string;
    number_of_term: number;
}
export interface ICreateSchoolSessionResponse {
    school_session: SchoolSession;
    school_term: SchoolTerm;
}
export interface IGetStartAndEndYearResponse {
    start_year: number;
    end_year: SchoolTerm;
}
export type IGenerateSessionSettingPayload = IGetStartAndEndYearResponse;
