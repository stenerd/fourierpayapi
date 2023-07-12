import { BadRequestException, Injectable } from '@nestjs/common';
import { PaystackService } from 'src/paystack/paystack.service';
import {
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from 'src/transaction/transaction.enum';
import { TransactionService } from 'src/transaction/transaction.service';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
import { WalletService } from 'src/wallet/wallet.service';
import { PaymentLinkStateEnum } from 'src/payment-link/payment-link.enum';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly paystackService: PaystackService,
    private readonly withdrawalService: WithdrawalService,
    private readonly userRepository: UserRepository,
    private readonly paymentLinkService: PaymentLinkService,
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
  ) {}

  async webhook(body: Record<string, any>) {
    const { event, data } = body;

    switch (event) {
      case 'transfer.success':
        await this.successfulTransferWebhook(data);
        break;

      case 'charge.success':
        await this.successfulPaymentWebhook(data);
        break;

      default:
        break;
    }
  }

  async successfulPaymentWebhook(data: Record<string, any>) {
    const { reference } = data;
    console.log('successfulPaymentWebhook >> ');

    await this.paymentService.verifyPayment({ reference });
  }

  async successfulTransferWebhook(data: Record<string, any>) {
    const { reference, status } = data;

    const withdrawal = await this.withdrawalService.findOne({
      paystack_reference: reference,
    });

    if (withdrawal) {
      await this.withdrawalService.updateOne(withdrawal._id, {
        status: status == 'success' ? TransactionStatus.PAID : status,
        payload: { ...withdrawal.payload, webhook: data },
      });

      const transaction = await this.transactionService.findOne({
        _id: withdrawal.transaction_id,
      });

      if (transaction) {
        await this.transactionService.updateOne(transaction._id, {
          status: status == 'success' ? TransactionStatus.PAID : status,
          payment_date: new Date(),
        });
      }

      const transaction_charges = await this.transactionService.findOne({
        out_entity_id: withdrawal._id,
        out_entity: TransactionEntity.WITHDRAWAL,
        is_charges: true,
        reciever_id: transaction.reciever_id,
      });

      if (transaction_charges) {
        await this.transactionService.updateOne(transaction_charges._id, {
          status: status == 'success' ? TransactionStatus.PAID : status,
          payment_date: new Date(),
        });
      }

      if (withdrawal.charges) {
        const get_reference = await this.transactionService.generateReference();

        const superAdmin = await this.userRepository.findOne({
          email: 'fourierpay@gmail.com',
        });

        const adminWallet = await this.walletService.updateWallet({
          user_id: superAdmin._id,
          amount: withdrawal.charges,
          type: TransactionType.CREDIT,
        });
        const trnx_payload = {
          amount: withdrawal.charges,
          reciever_id: superAdmin._id,
          in_entity_id: withdrawal._id,
          in_entity: TransactionEntity.WITHDRAWAL,
          reference: get_reference.reference,
          type: TransactionType.CREDIT,
          status: TransactionStatus.PAID,
          out_entity_id: adminWallet._id,
          out_entity: TransactionEntity.WALLET,
          is_charges: true,
        };

        await this.transactionService.create({ ...trnx_payload });
      }
    }
  }
}
