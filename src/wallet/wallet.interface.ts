import {
  TransactionStatus,
  TransactionType,
} from 'src/transaction/transaction.enum';
import { Transaction } from 'src/transaction/transaction.model';
import { Wallet } from './wallet.model';

export interface IWalletUpdateReponse {
  wallet: Wallet;
  transaction: Transaction;
}

export interface IWalletUpdate {
  user_id: string;
  amount: number;
  type: TransactionType;
}
