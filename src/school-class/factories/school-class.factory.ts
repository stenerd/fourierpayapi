import { Injectable } from '@nestjs/common';
import { ISchoolSessionPayload } from '../interfaces/school-session.interface';
import { SchoolSession } from '../models/school-session.model';

@Injectable()
export class SchoolSessionFactory {
  createNew(data: ISchoolSessionPayload): Record<string, any> {
    const school_session = new SchoolSession();

    for (const [key, value] of Object.entries(data)) {
      school_session[key] = value;
    }

    return school_session;
  }
}
