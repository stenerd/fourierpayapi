import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { SchoolDataRepository } from './school-data.repository';
import { SchoolOnboardingDto } from 'src/school/dtos/onboarding.dto';
import { SchoolDataFactory } from './school-data.factory';
import { SchoolData } from './school-data.model';

@Injectable()
export class SchoolDataService extends CoreService<SchoolDataRepository> {
  constructor(
    private readonly repository: SchoolDataRepository,
    private readonly factory: SchoolDataFactory,
  ) {
    super(repository);
  }

  async create(data: SchoolOnboardingDto): Promise<SchoolData> {
    if (
      await this.repository.findOne({
        $or: [
          { school_email: data.school_email },
          { school_name: data.school_name },
        ],
      })
    )
      throw new ConflictException(
        'A school with this information already exists',
      );

    const school_data_attribute = this.factory.createNew(data);
    const school_data = await this.repository.create(school_data_attribute);
    return school_data;
  }
}
