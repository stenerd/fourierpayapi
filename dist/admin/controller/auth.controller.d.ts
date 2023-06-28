import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CoreController } from 'src/common/core/controller.core';
import { AdminAuthService } from '../service/auth.service';
export declare class AdminAuthController extends CoreController {
    private readonly authService;
    constructor(authService: AdminAuthService);
    login(loginDto: LoginDto, res: Response): Promise<void>;
}
