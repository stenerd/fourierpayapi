import { ViewWithdrawalDto } from 'src/withdrawal/withdrawal.dto';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';
export declare class AdminWithdrawalService {
    private readonly withdrawalService;
    constructor(withdrawalService: WithdrawalService);
    withdrawals(query: ViewWithdrawalDto): Promise<{
        data: Omit<import("../../withdrawal/withdrawal.model").Withdrawal & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
}
