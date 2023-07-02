import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { PaystackService } from 'src/paystack/paystack.service';
import {
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from 'src/transaction/transaction.enum';
import { TransactionService } from 'src/transaction/transaction.service';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';
import { CreateWalletDto, walletWithdrawalDto } from './dto/create-wallet.dto';
// import { UpdateWalletDto } from './dto/update-wallet.dto';
import { IWalletUpdate, IWalletUpdateReponse } from './wallet.interface';
import { Wallet } from './wallet.model';
import { WalletRepository } from './wallet.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class WalletService extends CoreService<WalletRepository> {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionService: TransactionService,
    private readonly paystackService: PaystackService,
    private readonly withdrawalService: WithdrawalService,
    private readonly userRepository: UserRepository,
  ) {
    super(walletRepository);
  }

  async updateWallet(data: IWalletUpdate): Promise<Wallet> {
    const wallet = await this.findOne({ user_id: data.user_id });

    if (!wallet) throw new BadRequestException('Wallet does not exist.');

    // let ref = data.reference;
    // if (!ref) {
    //   const resp = await this.transactionService.generateReference();
    //   ref = resp.reference;
    // }

    // const transaction = await this.transactionService.create({
    //   amount: data.amount,
    //   reciever_id: data.user_id,
    //   entity_id: wallet._id,
    //   entity: TransactionEntity.WALLET,
    //   type: data.type,
    //   reference: ref,
    //   status: data.status,
    //   payment_date: new Date(),
    // });

    await this.updateOne(wallet._id, {
      amount:
        data.type == TransactionType.CREDIT
          ? wallet.amount + data.amount
          : wallet.amount - data.amount,
    });

    // return {
    //   wallet,
    //   transaction,
    // };
    return wallet;
  }

  async getWallet(user_id: string = null) {
    const resp = await this.walletRepository.findOne(
      {
        ...(user_id && { user_id }),
      },
      {},
      {
        populate: [{ path: 'user_id' }],
      },
    );

    return resp;
  }

  computeCharges(amount: number): number {
    if (amount <= 5000) return 50;
    if (amount > 5000 && amount <= 50000) return 75;
    if (amount > 50000) return 100;
  }

  async walletWithdraw(data: walletWithdrawalDto, user_id: string) {
    const get_wallet = await this.respository.findOne({ user_id });

    if (!get_wallet) throw new BadRequestException('Wallet does not exist.');

    const charges = this.computeCharges(data.amount);
    const totalAmount = data.amount + charges;

    if (get_wallet.amount < +totalAmount)
      throw new BadRequestException(
        'Insufficient wallet balance. Wait till you recieve more payments before processing a withdrawal.',
      );

    const create_recipient = await this.paystackService.transferRecipient({
      type: 'nuban',
      name: data.name,
      account_number: data.account_number,
      bank_code: data.bank_code,
      currency: 'NGN',
      user_id,
    });

    console.log(create_recipient.recipient_code, data.amount);

    const create_transfer = await this.paystackService.transfer(
      create_recipient.recipient_code,
      data.amount * 100,
    );

    // processing charges

    const wallet = await this.updateWallet({
      user_id,
      amount: +totalAmount,
      type: TransactionType.DEBIT,
    });

    const resp = await this.transactionService.generateReference();

    const transaction = await this.transactionService.create({
      amount: +data.amount,
      reciever_id: user_id,
      in_entity_id: wallet._id,
      in_entity: TransactionEntity.WALLET,
      type: TransactionType.DEBIT,
      reference: resp.reference,
      status:
        create_transfer.status == 'success'
          ? TransactionStatus.PAID
          : create_transfer.status,
      ...(create_transfer.status == 'success'
        ? { payment_date: new Date() }
        : {}),
    });

    const widthrawal = await this.withdrawalService.create({
      user_id,
      amount: +data.amount,
      charges: +charges,
      account_number: data.account_number,
      bank_name: data.bank_name,
      name: data.name,
      bank_code: data.bank_code,
      recipient_code: create_recipient.recipient_code,
      transfer_code: create_transfer.transfer_code,
      paystack_reference: create_transfer.reference,
      transaction_id: transaction._id,
      payload: {
        recipient: create_recipient,
        transfer: create_transfer,
      },
      status:
        create_transfer.status == 'success'
          ? TransactionStatus.PAID
          : create_transfer.status,
    });

    await this.transactionService.updateOne(transaction._id, {
      out_entity_id: widthrawal._id,
      out_entity: TransactionEntity.WITHDRAWAL,
    });

    const resp2 = await this.transactionService.generateReference();

    await this.transactionService.create({
      amount: +charges,
      reciever_id: user_id,
      in_entity_id: wallet._id,
      in_entity: TransactionEntity.WALLET,
      type: TransactionType.DEBIT,
      reference: resp2.reference,
      status:
        create_transfer.status == 'success'
          ? TransactionStatus.PAID
          : create_transfer.status,
      ...(create_transfer.status == 'success'
        ? { payment_date: new Date() }
        : {}),
      out_entity_id: widthrawal._id,
      out_entity: TransactionEntity.WITHDRAWAL,
      is_charges: true,
    });

    return widthrawal;
  }

  async webhook(body: Record<string, any>) {
    const { event, data } = body;

    switch (event) {
      case 'transfer.success':
        await this.successfulTransferWebhook(data);
        break;

      default:
        break;
    }
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

        const adminWallet = await this.updateWallet({
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
