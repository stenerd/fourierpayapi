import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SchoolOnboardingDto } from '../dtos/onboarding.dto';
import { SchoolDataService } from 'src/school-data/school-data.service';
import { SchoolOnboardingFactory } from '../factories/onboarding.factory';
import { ISchoolOnboardingResponse } from '../interfaces/onboarding.interface';

@Injectable()
export class SchoolOnboardingService {
  constructor(
    private readonly userService: UserService,
    private readonly schoolDataService: SchoolDataService,
    private readonly factory: SchoolOnboardingFactory,
  ) {}

  async createAccount(
    data: SchoolOnboardingDto,
  ): Promise<ISchoolOnboardingResponse> {
    if (await this.userService.findOne({ email: data.school_email }))
      throw new ConflictException('A user with this email already exist');

    const school = await this.schoolDataService.create(data);

    const user = await this.userService.create(
      this.factory.createNewUser(data, school._id),
    );

    return {
      user,
      school,
    };
  }
}
