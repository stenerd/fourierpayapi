import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';
import { TransactionService } from 'src/transaction/transaction.service';
export declare class AdminTransactionService {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    transactions(query: ViewTransactionDto): Promise<{
        data: Omit<import("../../transaction/transaction.model").Transaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    charges(query: ViewTransactionDto): Promise<{
        data: Omit<import("../../transaction/transaction.model").Transaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
}
