import { Injectable } from '@nestjs/common';
import { SchoolOnboardingDto } from 'src/school/dtos/onboarding.dto';
import { SchoolData } from './school-data.model';

@Injectable()
export class SchoolDataFactory {
  createNew(data: SchoolOnboardingDto): SchoolData {
    const school_data: SchoolData = {
      number_of_students: data.number_of_students,
      school_name: data.school_name,
      school_admin_name: data.school_admin_name,
      school_email: data.school_email,
      school_mobile_number: data.school_mobile_number,
      school_logo: data.school_logo,
      school_banner: data.school_banner,
    };

    return school_data;
  }
}
