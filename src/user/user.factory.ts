import { Injectable } from '@nestjs/common';
import { GenerateRandomString } from 'src/utils/code-generator.util';
import { CreateCompleteUserDto, CreateUserDto } from './dto/create-user.dto';
import { RoleEnum } from './user.enum';

@Injectable()
export class UserFactory {
  createNew(data: CreateCompleteUserDto): Record<string, any> {
    const user: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      user[key] = value;
    }

    user.token = GenerateRandomString(30);

    return user;
  }
}
