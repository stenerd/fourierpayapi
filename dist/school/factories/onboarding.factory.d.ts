import { SchoolOnboardingDto } from 'src/school/dtos/onboarding.dto';
import { CreateCompleteUserDto } from 'src/user/dto/create-user.dto';
export declare class SchoolOnboardingFactory {
    createNewUser(data: SchoolOnboardingDto, role_id: string): CreateCompleteUserDto;
}
