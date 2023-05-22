import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { Subscription } from 'src/subscription/models/subscription.model';
export declare class UserController extends CoreController {
    private readonly userService;
    constructor(userService: UserService);
    createSuperAcount(dto: CreateUserDto, res: Response): Promise<void>;
    updateUser(dto: UpdateUserDto, currentUser: IJWTUser, res: Response): Promise<void>;
    profile(currentUser: IJWTUser, currentSubscription: Subscription, res: Response): Promise<void>;
}
