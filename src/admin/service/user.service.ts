import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AllUserDto } from '../dtos/user.dto';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';

@Injectable()
export class AdminUserService {
  constructor(private readonly userService: UserService) {}

  async allUsers(query: AllUserDto) {
    const users = await this.userService.allUsers(query);
    return users;
  }

  async allCountUsers() {
    const users = await this.userService.allCountUsers();
    return users;
  }

  async countUsers(query: CoreSearchFilterDatePaginationDto) {
    const users = await this.userService.countUsers(query);
    return users;
  }
}
