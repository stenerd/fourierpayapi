import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IJWTUser } from 'src/auth/auth.interface';
import { LoginDto } from 'src/auth/dto/login.dto';
export declare class AdminAuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
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
}
