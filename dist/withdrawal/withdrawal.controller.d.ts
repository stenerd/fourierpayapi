import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { CoreController } from 'src/common/core/controller.core';
import { ViewWithdrawalDto } from './withdrawal.dto';
import { WithdrawalService } from './withdrawal.service';
export declare class WithdrawalController extends CoreController {
    private readonly withdrawalService;
    constructor(withdrawalService: WithdrawalService);
    fetchProfileWithdrawal(currentUser: IJWTUser, res: Response): Promise<void>;
    fetchWithdrawal(currentUser: IJWTUser, res: Response, query: ViewWithdrawalDto): Promise<void>;
}
