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
    chargesCount(query: ViewTransactionDto): Promise<{
        percentage: number;
        showPercent: boolean;
        total: number;
        paystackTotal: number;
        paystackPercentage: number;
        adminCharge: number;
        adminChargePercentage: number;
    }>;
    transactionsCount(query: ViewTransactionDto): Promise<{
        percentage: number;
        showPercent: boolean;
        total: any;
        paymentTotal: any;
        paymentPercentage: number;
        withdrawalTotal: any;
        withdrawalPercentage: number;
    }>;
}
