import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { LinkService } from 'src/link/link.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController extends CoreController {
    private readonly authService;
    private readonly userService;
    private readonly linkService;
    constructor(authService: AuthService, userService: UserService, linkService: LinkService);
    registration(createUserDto: CreateUserDto, res: Response): Promise<void>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
    confirmEmail(token: string, res: Response): Promise<void>;
    forgotPassword(dto: ForgotPasswordDto, res: Response): Promise<void>;
    resetPassword(token: any, resetPasswordDto: ResetPasswordDto, res: Response): Promise<void>;
}
