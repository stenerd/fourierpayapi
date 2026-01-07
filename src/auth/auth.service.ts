import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { IJWTUser } from './auth.interface';
import { EmailService } from 'src/email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { RoleEnum } from 'src/user/user.enum';
import {
  AffiliateRegisterDto,
  AffiliateLoginDto,
} from './dto/affiliate-auth.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly emailService: EmailService,
  ) {}

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async updateUserDetails(userId: string, rToken: string): Promise<any> {
    const refresh_token = await bcrypt.hash(rToken, 12);
    await this.userService.updateOne(userId, { refresh_token });
  }

  // Updated to accept partial payload
  async createTokens(userObj: {
    _id: string;
    email?: string;
    role: RoleEnum;
    firstname?: string;
    lastname?: string;
  }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: userObj._id,
          email: userObj.email || null,
          role: userObj.role,
          firstname: userObj.firstname,
          lastname: userObj.lastname,
        },
        { expiresIn: 60 * 60 * 7 },
      ),
      this.jwtService.signAsync(
        {
          userId: userObj._id,
          email: userObj.email || null,
          role: userObj.role,
        },
        { expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);
    await this.updateUserDetails(userObj._id, refreshToken);
    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const get_user = await this.userService.findOne({ email: loginDto.email });

    if (!get_user)
      throw new NotFoundException('Invalid email/password provided.');

    if (get_user.role !== RoleEnum.ADMIN)
      throw new NotFoundException('Invalid email/password provided.');
    const passwordMatch = await this.comparePassword(
      loginDto.password,
      get_user.password,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Invalid email/password provided.');
    }

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

  async forgotPassword(email: string) {
    const resp = await this.userService.updateToken({ email });

    this.emailService.sendMail(
      this.mailerService,
      email,
      'Reset Password',
      'reset-password',
      {
        firstname: resp.firstname,
        lastname: resp.lastname,
        token: resp.token,
      },
    );

    return resp;
  }

  async affiliateRegister(dto: AffiliateRegisterDto) {
    // Check uniqueness
    const existingPhone = await this.userService.findOne({
      phonenumber: dto.phonenumber,
    });
    if (existingPhone)
      throw new BadRequestException('Phone number already registered');

    const existingEmail = await this.userService.findOne({ email: dto.email });
    if (existingEmail)
        throw new NotFoundException('Email already registered');

    // Use the exact same create method as normal registration
    const user = await this.userService.create({
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      phonenumber: dto.phonenumber,
      password: dto.password,
      role: RoleEnum.AFFILIATE,
    });

    // Generate affiliate code
    let affiliateCode: string;
    do {
      affiliateCode = randomBytes(4).toString('hex').toUpperCase();
    } while (await this.userService.findOne({ affiliateCode }));

    // Update with affiliate-specific fields
    await this.userService.updateOne(user._id, {
      affiliateCode,
      affiliateEarnings: 0,
    });

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const { accessToken } = await this.createTokens(payload);

    const updatedUser = await this.userService.findOne({ _id: user._id });

    return {
      message: 'Affiliate registration successful',
      token: accessToken,
      user: {
        id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        phonenumber: updatedUser.phonenumber,
        role: updatedUser.role,
        affiliateCode: updatedUser.affiliateCode,
      },
    };
  }

  async affiliateLogin(dto: AffiliateLoginDto) {
    const user = await this.userService.findOne({
      email: dto.email.toLowerCase(),
    });
    console.log('user', user);

    if (!user || user.role !== RoleEnum.AFFILIATE) {
      throw new NotFoundException('Invalid email/password provided.');
    }

    const passwordMatch = await this.comparePassword(
      dto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new NotFoundException('Invalid email/password provided.');
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const { accessToken } = await this.createTokens(payload);

    return {
      message: 'Login successful',
      token: accessToken,
      user: {
        id: user._id,
        name: user.firstname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
        affiliateCode: user.affiliateCode,
      },
    };
  }
}
