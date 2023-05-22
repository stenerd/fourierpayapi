import { CoreService } from 'src/common/core/service.core';
import { PaystackService } from 'src/paystack/paystack.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';
import { walletWithdrawalDto } from './dto/create-wallet.dto';
import { IWalletUpdate } from './wallet.interface';
import { Wallet } from './wallet.model';
import { WalletRepository } from './wallet.repository';
export declare class WalletService extends CoreService<WalletRepository> {
    private readonly walletRepository;
    private readonly transactionService;
    private readonly paystackService;
    private readonly withdrawalService;
    constructor(walletRepository: WalletRepository, transactionService: TransactionService, paystackService: PaystackService, withdrawalService: WithdrawalService);
    updateWallet(data: IWalletUpdate): Promise<Wallet>;
    getWallet(user_id?: string): Promise<import("./wallet.model").WalletDocument>;
    walletWithdraw(data: walletWithdrawalDto, user_id: string): Promise<any>;
}
