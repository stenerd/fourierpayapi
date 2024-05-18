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
