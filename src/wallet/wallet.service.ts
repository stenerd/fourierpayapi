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

@Injectable()
export class WalletService extends CoreService<WalletRepository> {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionService: TransactionService,
    private readonly paystackService: PaystackService,
    private readonly withdrawalService: WithdrawalService,
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

  async walletWithdraw(data: walletWithdrawalDto, user_id: string) {
    const create_recipient = await this.paystackService.transferRecipient({
      type: 'nuban',
      name: data.name,
      account_number: data.account_number,
      bank_code: data.bank_code,
      currency: 'NGN',
      user_id,
    });

    console.log('create_recipient >> ', create_recipient);
    // create_recipient >>  {
    //   active: true,
    //   createdAt: '2023-01-16T10:51:58.000Z',
    //   currency: 'NGN',
    //   description: null,
    //   domain: 'test',
    //   email: null,
    //   id: 46322437,
    //   integration: 175187,
    //   metadata: { user_id: '63b66c6e958dfd81488e8254' },
    //   name: 'CHINEDU CHUKWUEMEKA IFEDIORAH',
    //   recipient_code: 'RCP_qxr41k38zmk46ws',
    //   type: 'nuban',
    //   updatedAt: '2023-01-16T13:40:27.000Z',
    //   is_deleted: false,
    //   isDeleted: false,
    //   details: {
    //     authorization_code: null,
    //     account_number: '6235852943',
    //     account_name: 'CHINEDU CHUKWUEMEKA IFEDIORAH',
    //     bank_code: '070',
    //     bank_name: 'Fidelity Bank'
    //   }
    // }

    console.log(create_recipient.recipient_code, data.amount);

    const create_transfer = await this.paystackService.transfer(
      create_recipient.recipient_code,
      data.amount * 100,
    );
    console.log('create_transfer >> ', create_transfer);
    // create_transfer >>  {
    //   transfersessionid: [],
    //   domain: 'test',
    //   amount: 230000,
    //   currency: 'NGN',
    //   reference: 'rfkvwvupo9pic2loe21i',
    //   source: 'balance',
    //   source_details: null,
    //   reason: 'Transfer',
    //   status: 'success',
    //   failures: null,
    //   transfer_code: 'TRF_jklmd7vu501jk65j',
    //   titan_code: null,
    //   transferred_at: null,
    //   id: 230038484,
    //   integration: 175187,
    //   request: 204029224,
    //   recipient: 46322437,
    //   createdAt: '2023-01-16T13:40:28.000Z',
    //   updatedAt: '2023-01-16T13:40:28.000Z'
    // }

    const wallet = await this.updateWallet({
      user_id,
      amount: data.amount,
      type: TransactionType.DEBIT,
    });

    const resp = await this.transactionService.generateReference();

    const transaction = await this.transactionService.create({
      amount: data.amount,
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
      amount: data.amount,
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

    return widthrawal;
  }
}
