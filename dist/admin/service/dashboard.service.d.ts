import { UserService } from 'src/user/user.service';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionService } from 'src/transaction/transaction.service';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';
export declare class AdminDashboardService {
    private readonly userService;
    private readonly transactionService;
    private readonly paymentLinkService;
    private readonly withdrawalService;
    constructor(userService: UserService, transactionService: TransactionService, paymentLinkService: PaymentLinkService, withdrawalService: WithdrawalService);
    dashboard(query: CoreSearchFilterDatePaginationDto): Promise<{
        users: number;
        transaction: {
            totalAll: number;
        };
        paymentLink: {
            totalAll: number;
        };
        charge: {
            totalAll: number;
        };
        withdrawal: {
            totalAll: number;
        };
    }>;
}
