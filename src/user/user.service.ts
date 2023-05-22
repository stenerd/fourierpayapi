import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from './user.enum';
import { UserFactory } from './user.factory';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from 'src/email.service';
import { GenerateRandomString } from 'src/utils/code-generator.util';
import { ResetPasswordDto } from 'src/auth/dto/create-auth.dto';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { SubscriptionSettingService } from 'src/subscription/services/subscription-setting.service';
import { SubscriptionTagEnum } from 'src/subscription/subscription.enum';

@Injectable()
export class UserService extends CoreService<UserRepository> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly walletService: WalletService,
    private readonly subscriptionService: SubscriptionService,
    private readonly subscriptionSettingService: SubscriptionSettingService,
    private readonly mailerService: MailerService,
    private readonly emailService: EmailService,
  ) {
    super(userRepository);
  }

  async createSuperAcount(data: CreateUserDto): Promise<any> {
    if (await this.userRepository.findOne({ email: data.email }))
      throw new ConflictException('Email already exist');

    const userAttribute = this.userFactory.createNew(data);
    userAttribute.role = RoleEnum.SUPERADMIN;
    userAttribute.isActive = true;
    delete userAttribute.token;
    const user = await this.userRepository.create(userAttribute);
    await this.walletService.create({
      user_id: user._id,
      amount: 0,
    });
  }

  async create(data: CreateUserDto): Promise<any> {
    if (await this.userRepository.findOne({ email: data.email }))
      throw new ConflictException('Email already exist');

    const userAttribute = this.userFactory.createNew(data);
    const user = await this.userRepository.create(userAttribute);
    await this.walletService.create({
      user_id: user._id,
      amount: 0,
    });

    const subscription_setting =
      await this.subscriptionSettingService.fetchOneSubscriptionSetting({
        tag: SubscriptionTagEnum.BASIC,
        active: true,
      });

    await this.subscriptionService.createSubscription(
      user._id,
      subscription_setting._id,
    );

    this.emailService.sendMail(
      this.mailerService,
      user.email,
      'Welcome',
      'confirm-email',
      {
        firstname: user.firstname,
        lastname: user.lastname,
        token: user.token,
      },
    );

    return user;
  }

  async updateUser(data: UpdateUserDto, user_id: string): Promise<any> {
    await this.updateOne(user_id, data);
  }

  async profile(user_id: string): Promise<User> {
    return await this.findOne(
      { _id: user_id },
      // {},
      // {
      //   populate: [{ path: 'wallet' }],
      // },
    );
  }

  async confirmEmail(token: string): Promise<any> {
    const get_user = await this.findOne({ token });
    if (!get_user) throw new BadRequestException('invalid request');

    return await this.updateOne(get_user._id, {
      token: null,
      isActive: true,
    });
  }

  async resetPassword(token: string, dto: ResetPasswordDto): Promise<any> {
    const get_user = await this.findOne({ token });
    if (!get_user) throw new BadRequestException('invalid request');

    get_user.token = null;
    get_user.password = dto.password;
    return await this.userRepository.save(get_user);
  }

  async updateToken(query: Record<string, any>): Promise<any> {
    const get_user = await this.findOne({ ...query });
    if (!get_user) throw new BadRequestException('user does not exist');

    get_user.token = GenerateRandomString(30);

    return await this.userRepository.save(get_user);
  }
}
