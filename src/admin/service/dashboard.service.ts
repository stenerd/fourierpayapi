import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AllUserDto } from '../dtos/user.dto';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { TransactionService } from 'src/transaction/transaction.service';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';

@Injectable()
export class AdminDashboardService {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly paymentLinkService: PaymentLinkService,
    private readonly withdrawalService: WithdrawalService,
  ) {}

  async dashboard(query: CoreSearchFilterDatePaginationDto) {
    const users = await this.userService.dashboardCount(query);
    const transaction = await this.transactionService.dashboardTransaction(
      query,
    );
    const charge = await this.transactionService.dashboardCharge(query);
    const paymentLink = await this.paymentLinkService.dashboardPaymentLink(
      query,
    );
    const withdrawal = await this.withdrawalService.dashboardWithdrawal(query);
    return { users, transaction, paymentLink, charge, withdrawal };
  }
}
