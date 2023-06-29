import { UserService } from 'src/user/user.service';
import { AllUserDto } from '../dtos/user.dto';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
export declare class AdminUserService {
    private readonly userService;
    constructor(userService: UserService);
    allUsers(query: AllUserDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    allCountUsers(): Promise<{
        data: {
            active: number;
            inactive: number;
        };
    }>;
    countUsers(query: CoreSearchFilterDatePaginationDto): Promise<{
        data: {
            all: number;
            active: number;
            inactive: number;
            allPercentage: number;
            inActivePercentage: number;
            activePercentage: number;
            showPercent: boolean;
        };
    }>;
}
