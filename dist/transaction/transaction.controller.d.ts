import { TransactionService } from './transaction.service';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { ViewTransactionDto } from './dto/view-transaction.dto';
export declare class TransactionController extends CoreController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    generateReference(res: Response): Promise<void>;
    getTransaction(res: Response, currentUser: IJWTUser, query: ViewTransactionDto): Promise<void>;
}
