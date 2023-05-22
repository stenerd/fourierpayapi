import { TransactionEntity } from 'src/transaction/transaction.enum';

export interface IInitializePaystack {
  payer_id?: string;
  email?: string;
  payment_link_id?: string;
  entity_id: string;
  reference: string;
  amount: number;
  entity: TransactionEntity;
  reciever_id?: string;
  metadata: Record<string, any>;
  currency?: string;
  channels?: string[];
}

export interface ITransferRecipient {
  type: string;
  name: string;
  account_number: string;
  bank_code: string;
  currency: string;
  user_id: string;
}
