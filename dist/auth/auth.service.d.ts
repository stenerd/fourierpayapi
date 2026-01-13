import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { RoleEnum } from 'src/user/user.enum';
import { AffiliateRegisterDto, AffiliateLoginDto } from './dto/affiliate-auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailerService;
    private readonly emailService;
    constructor(userService: UserService, jwtService: JwtService, mailerService: MailerService, emailService: EmailService);
    comparePassword(password: string, hash: string): Promise<any>;
    updateUserDetails(userId: string, rToken: string): Promise<any>;
    createTokens(userObj: {
        _id: string;
        email?: string;
        role: RoleEnum;
        firstname?: string;
        lastname?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        user: any;
    }>;
    forgotPassword(email: string): Promise<any>;
    affiliateRegister(dto: AffiliateRegisterDto): Promise<{
        message: string;
        token: string;
        user: {
            id: any;
            firstname: any;
            lastname: any;
            email: any;
            phonenumber: any;
            role: any;
            affiliateCode: any;
        };
    }>;
    affiliateLogin(dto: AffiliateLoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
            phonenumber: any;
            role: any;
            affiliateCode: any;
        };
    }>;
}
