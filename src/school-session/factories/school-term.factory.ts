import { Injectable } from '@nestjs/common';
import { SchoolTerm } from '../models/school-term.model';
import {
  IGetStartAndEndYearResponse,
  ISchoolTermPayload,
} from '../interfaces/school-session.interface';
import { Types } from 'mongoose';

@Injectable()
export class SchoolTermFactory {
  createNew(data: ISchoolTermPayload): Record<string, any>[] {
    const result: Record<string, any>[] = [];

    for (let i = 0; i < data.number_of_term; i++) {
      const school_term = new SchoolTerm();
      school_term.name = `Term ${i + 1}`;
      school_term.school_id = new Types.ObjectId(data.school_id);
      school_term.session_id = new Types.ObjectId(data.session_id);
      school_term.session_setting_id = new Types.ObjectId(
        data.session_setting_id,
      );

      result.push(school_term);
    }

    return result;
  }

  getStartAndEndYear(): IGetStartAndEndYearResponse {
    const current_date = new Date();

    // Get the current month and year
    const current_month = current_date.getMonth();
    const current_year = current_date.getFullYear();

    let start_year, end_year;

    // Check if the current month is September or later
    if (current_month >= 8) {
      // September or later
      start_year = current_year; // Previous year
      end_year = current_year + 1; // Current year
    } else {
      // Before September
      start_year = current_year - 1; // Current year
      end_year = current_year; // Next year
    }

    return { start_year, end_year };
  }
}
