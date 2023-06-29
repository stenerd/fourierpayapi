import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { AdminTransactionService } from '../service/transaction.service';
import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';
export declare class AdminTransactionController extends CoreController {
    private readonly adminTransactionService;
    constructor(adminTransactionService: AdminTransactionService);
    transactions(res: Response, query: ViewTransactionDto): Promise<void>;
    charges(res: Response, query: ViewTransactionDto): Promise<void>;
    chargesCount(res: Response, query: ViewTransactionDto): Promise<void>;
    transactionsCount(res: Response, query: ViewTransactionDto): Promise<void>;
}
