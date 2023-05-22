import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { IJWTUser } from './auth.interface';
import { EmailService } from 'src/email.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailerService;
    private readonly emailService;
    constructor(userService: UserService, jwtService: JwtService, mailerService: MailerService, emailService: EmailService);
    comparePassword(password: string, hash: string): Promise<any>;
    updateUserDetails(userId: string, rToken: string): Promise<any>;
    createTokens(userObj: IJWTUser): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        user: any;
    }>;
    forgotPassword(email: string): Promise<any>;
}
