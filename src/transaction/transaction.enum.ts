export enum TransactionEntity {
  PAYMENT = 'Payment',
  WITHDRAWAL = 'Withdrawal',
  WALLET = 'Wallet',
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TransactionStatus {
  PENDING = 'pending',
  PAID = 'paid',
  DECLINED = 'declined',
  ABANDONED = 'abandoned',
}
