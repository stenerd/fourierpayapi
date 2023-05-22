import { CoreService } from 'src/common/core/service.core';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFactory } from './user.factory';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from 'src/email.service';
import { ResetPasswordDto } from 'src/auth/dto/create-auth.dto';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { SubscriptionSettingService } from 'src/subscription/services/subscription-setting.service';
export declare class UserService extends CoreService<UserRepository> {
    private readonly userRepository;
    private readonly userFactory;
    private readonly walletService;
    private readonly subscriptionService;
    private readonly subscriptionSettingService;
    private readonly mailerService;
    private readonly emailService;
    constructor(userRepository: UserRepository, userFactory: UserFactory, walletService: WalletService, subscriptionService: SubscriptionService, subscriptionSettingService: SubscriptionSettingService, mailerService: MailerService, emailService: EmailService);
    createSuperAcount(data: CreateUserDto): Promise<any>;
    create(data: CreateUserDto): Promise<any>;
    updateUser(data: UpdateUserDto, user_id: string): Promise<any>;
    profile(user_id: string): Promise<User>;
    confirmEmail(token: string): Promise<any>;
    resetPassword(token: string, dto: ResetPasswordDto): Promise<any>;
    updateToken(query: Record<string, any>): Promise<any>;
}
