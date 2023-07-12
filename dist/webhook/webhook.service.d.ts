import { PaystackService } from 'src/paystack/paystack.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
import { WalletService } from 'src/wallet/wallet.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PaymentService } from 'src/payment/payment.service';
export declare class WebhookService {
    private readonly transactionService;
    private readonly paystackService;
    private readonly withdrawalService;
    private readonly userRepository;
    private readonly paymentLinkService;
    private readonly walletService;
    private readonly configService;
    private readonly userService;
    private readonly paymentService;
    constructor(transactionService: TransactionService, paystackService: PaystackService, withdrawalService: WithdrawalService, userRepository: UserRepository, paymentLinkService: PaymentLinkService, walletService: WalletService, configService: ConfigService, userService: UserService, paymentService: PaymentService);
    webhook(body: Record<string, any>): Promise<void>;
    successfulPaymentWebhook(data: Record<string, any>): Promise<void>;
    successfulTransferWebhook(data: Record<string, any>): Promise<void>;
}
