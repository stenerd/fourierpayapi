import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { TransactionStatus } from 'src/transaction/transaction.enum';

export type WithdrawalDocument = Withdrawal & Document;

@Schema({ timestamps: true })
export class Withdrawal {
  _id?: any;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ required: true, default: 0.0 })
  amount: number;

  @Prop({ required: true })
  account_number: string;

  @Prop({ required: true })
  bank_name: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  bank_code: string;

  @Prop({ required: false })
  recipient_code: string;

  @Prop({ required: false })
  transfer_code: string;

  @Prop({ required: false })
  paystack_reference: string;

  @Prop({ required: false, type: SchemaTypes.Mixed })
  payload: any;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'Transaction' })
  transaction_id: Types.ObjectId;

  @Prop({
    required: false,
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status?: TransactionStatus;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);

WithdrawalSchema.index({
  bank_name: 1,
  account_number: -1,
  name: 1,
  paystack_reference: -1,
});
