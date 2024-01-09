import { CoreService } from 'src/common/core/service.core';
import { ViewWithdrawalDto } from './withdrawal.dto';
import { WithdrawalRepository } from './withdrawal.repository';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { Withdrawal } from './withdrawal.model';
export declare class WithdrawalService extends CoreService<WithdrawalRepository> {
    private readonly withdrawalRepository;
    constructor(withdrawalRepository: WithdrawalRepository);
    fetchProfileWithdrawal(user_id: string): Promise<Omit<Withdrawal & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    fetchWithdrawal(user_id: string, query: ViewWithdrawalDto): Promise<{
        data: Omit<Withdrawal & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    dashboardWithdrawal(query: CoreSearchFilterDatePaginationDto): Promise<{
        totalAll: number;
    }>;
    adminWithdrawal(query: ViewWithdrawalDto): Promise<{
        data: Omit<Withdrawal & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    adminWithdrawalCount(query: ViewWithdrawalDto): Promise<{
        percentage: number;
        pendingPercentage: number;
        showPercent: boolean;
        totalRecentPendingAmount: number;
        totalRecentAmount: number;
    }>;
}
