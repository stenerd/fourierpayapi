/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
