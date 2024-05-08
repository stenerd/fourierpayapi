import { CreateSchoolSessionSettingDto } from '../dtos/school-session.dto';
import { IGenerateSessionSettingPayload } from '../interfaces/school-session.interface';
export declare class SchoolSessionSettingFactory {
    createNew(data: CreateSchoolSessionSettingDto): Record<string, any>;
    generateNew(data: IGenerateSessionSettingPayload): Record<string, any>;
}
