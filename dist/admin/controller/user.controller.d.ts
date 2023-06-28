import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { AdminUserService } from '../service/user.service';
import { AllUserDto } from '../dtos/user.dto';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
export declare class AdminUserController extends CoreController {
    private readonly adminUserService;
    constructor(adminUserService: AdminUserService);
    allUsers(query: AllUserDto, res: Response): Promise<void>;
    allCountUsers(res: Response): Promise<void>;
    countUsers(res: Response, query: CoreSearchFilterDatePaginationDto): Promise<void>;
}
