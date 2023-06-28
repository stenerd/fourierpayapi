import { CoreService } from 'src/common/core/service.core';
import { ViewTransactionDto } from './dto/view-transaction.dto';
import { Transaction } from './transaction.model';
import { TransactionRepository } from './transaction.repository';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
export declare class TransactionService extends CoreService<TransactionRepository> {
    private readonly transactionRepository;
    constructor(transactionRepository: TransactionRepository);
    generateReferenceCode(): Promise<string>;
    checkReference(reference: string): Promise<Transaction>;
    generateReference(): Promise<{
        reference: string;
    }>;
    getTransaction(user_id: string, query: ViewTransactionDto): Promise<{
        data: Omit<Transaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    dashboardTransaction(query: CoreSearchFilterDatePaginationDto): Promise<{
        totalAll: number;
    }>;
    dashboardCharge(query: CoreSearchFilterDatePaginationDto): Promise<{
        totalAll: number;
    }>;
    adminTransaction(query: ViewTransactionDto): Promise<{
        data: Omit<Transaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    adminCharge(query: ViewTransactionDto): Promise<{
        data: Omit<Transaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    adminChargeCount(query: ViewTransactionDto): Promise<{
        percentage: number;
        showPercent: boolean;
        total: number;
        paystackTotal: number;
        paystackPercentage: number;
        adminCharge: number;
        adminChargePercentage: number;
    }>;
}
