import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { ViewTransactionDto } from 'src/transaction/dto/view-transaction.dto';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class AdminTransactionService {
  constructor(private readonly transactionService: TransactionService) {}

  async transactions(query: ViewTransactionDto) {
    const resp = await this.transactionService.adminTransaction(query);
    return resp;
  }

  async charges(query: ViewTransactionDto) {
    const resp = await this.transactionService.adminCharge(query);
    return resp;
  }

  async chargesCount(query: ViewTransactionDto) {
    const resp = await this.transactionService.adminChargeCount(query);
    return resp;
  }

  async transactionsCount(query: ViewTransactionDto) {
    const resp = await this.transactionService.adminTransactionsCount(query);
    return resp;
  }
}
