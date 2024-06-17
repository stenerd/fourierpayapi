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
import { LinkRepository } from 'src/link/link.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
import { PaymentRepository } from 'src/payment/payment.repository';
import { TransactionRepository } from 'src/transaction/transaction.repository';
import { WithdrawalRepository } from 'src/withdrawal/withdrawal.repository';
import { ChartTypeEnum } from './dashboard.enum';
export declare class DashboardService {
    private readonly paymentRepository;
    private readonly paymentLinkRepository;
    private readonly transactionRepository;
    private readonly withdrawalRepository;
    private readonly linkRepository;
    constructor(paymentRepository: PaymentRepository, paymentLinkRepository: PaymentLinkRepository, transactionRepository: TransactionRepository, withdrawalRepository: WithdrawalRepository, linkRepository: LinkRepository);
    getDashboardMatrix(user_id?: string): Promise<{
        paymentCount: number;
        paymentLinkCount: number;
        income: number;
        withdrawal: number;
        availableLinksCount: number;
        usedLinksCount: number;
    }>;
    getDashboardTables(user_id?: string): Promise<{
        recentPayments: Omit<import("../payment/payment.model").Payment & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        recentPaymentLinks: (import("../payment-link/models/payment-link.model").PaymentLink & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getProfileTables(user_id?: string): Promise<{
        recentTransaction: Omit<import("../transaction/transaction.model").Transaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        recentWithdrawals: any[];
    }>;
    getSundayFromWeekNum(weekNum: number, year: number): Date;
    getFirstAndlastDayOfTheMonth(year: number, month: number): Date[];
    getFirstAndlastDayOfTheYear(year: number): Date[];
    chartAnalysis(startDate: any, endDate: any, user_id: any): Promise<Record<string, any>>;
    getChartData(type: ChartTypeEnum, year: string, param?: string | number, user_id?: string): Promise<Record<string, any>>;
}
