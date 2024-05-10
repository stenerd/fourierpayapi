import { Injectable } from '@nestjs/common';
import { SchoolOnboardingDto } from 'src/school/dtos/onboarding.dto';
import { CreateCompleteUserDto } from 'src/user/dto/create-user.dto';
import { RoleEnum } from 'src/user/user.enum';

@Injectable()
export class SchoolOnboardingFactory {
  createNewUser(
    data: SchoolOnboardingDto,
    role_id: string,
  ): CreateCompleteUserDto {
    const name_arr = data.school_admin_name.split(' ');
    const user_data: CreateCompleteUserDto = {
      firstname: name_arr.slice(0, name_arr.length - 1).join(' '),
      lastname: name_arr[name_arr.length - 1],
      email: data.school_email,
      phonenumber: data.school_mobile_number,
      password: data.password,
      role: RoleEnum.SCHOOL,
      // role_id,
    };

    return user_data;
  }
}
