import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';
import { AdminWithdrawalService } from '../service/withdrawal.service';
export declare class AdminWithdrawalController extends CoreController {
    private readonly adminWithdrawalService;
    constructor(adminWithdrawalService: AdminWithdrawalService);
    withdrawals(res: Response, query: ViewTransactionDto): Promise<void>;
    withdrawalsCount(res: Response, query: ViewTransactionDto): Promise<void>;
}
