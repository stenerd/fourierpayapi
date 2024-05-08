import { Injectable } from '@nestjs/common';
import { CreateSchoolSessionSettingDto } from '../dtos/school-session.dto';
import { SchoolSessionSetting } from '../models/school-session-setting.model';
import { IGenerateSessionSettingPayload } from '../interfaces/school-session.interface';

@Injectable()
export class SchoolSessionSettingFactory {
  createNew(data: CreateSchoolSessionSettingDto): Record<string, any> {
    const school_session_setting = new SchoolSessionSetting();

    for (const [key, value] of Object.entries(data)) {
      school_session_setting[key] = value;
    }

    return school_session_setting;
  }

  generateNew(data: IGenerateSessionSettingPayload): Record<string, any> {
    const school_session_setting = new SchoolSessionSetting();

    school_session_setting.start_year = `${data.start_year}`;
    school_session_setting.end_year = `${data.end_year}`;
    school_session_setting.name = `${data.start_year}/${data.end_year}`;
    school_session_setting.tag = `${data.start_year}_${data.end_year}`;

    return school_session_setting;
  }
}
