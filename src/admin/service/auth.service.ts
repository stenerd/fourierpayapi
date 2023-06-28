import { Injectable, NotFoundException } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { RoleEnum } from 'src/user/user.enum';
import { IJWTUser } from 'src/auth/auth.interface';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // private readonly mailerService: MailerService, // private readonly emailService: EmailService,
  ) {}

  /**
   * Compares input password against saved hash password
   * @param password Com
   * @param hash
   * @returns
   */
  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Hash refresh token and save to db
   * @param userId
   * @param rToken
   */
  async updateUserDetails(userId: string, rToken: string): Promise<any> {
    const refresh_token = await bcrypt.hash(rToken, 12);
    await this.userService.updateOne(userId, { refresh_token });
  }

  /**
   * Generates tokens
   * @param userObj
   */
  async createTokens(userObj: IJWTUser) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(userObj, { expiresIn: 60 * 60 * 7 }),
      this.jwtService.signAsync(
        {
          userId: userObj._id.toString(),
          email: userObj.email,
          role: userObj.role,
        },
        { expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);
    await this.updateUserDetails(userObj._id, refreshToken);
    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const get_user = await this.userService.findOne({
      email: loginDto.email,
      role: RoleEnum.SUPERADMIN,
    });

    if (!get_user)
      throw new NotFoundException('Invalid email/password provided.');
    const passwordMatch = await this.comparePassword(
      loginDto.password,
      get_user.password,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Invalid email/password provided.');
    }

    // if (!get_user.isActive)
    //   throw new NotFoundException('Verify your email before you login.');

    const customerData = {
      firstname: get_user.firstname,
      lastname: get_user.lastname,
      email: get_user.email,
      role: get_user.role,
      _id: get_user._id,
    };

    const { accessToken } = await this.createTokens(customerData);

    return {
      message: `Login successful.`,
      token: accessToken,
      user: get_user,
    };
  }
}
