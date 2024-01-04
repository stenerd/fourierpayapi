import { SchoolData } from 'src/school-data/school-data.model';
import { User } from 'src/user/user.model';
export interface ISchoolOnboardingResponse {
    user: User;
    school: SchoolData;
}
