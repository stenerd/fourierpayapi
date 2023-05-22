import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import {
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from './transaction.enum';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  _id?: any;

  @Prop({ required: true, default: 0.0 })
  amount: number;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'User' })
  payer_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'User' })
  reciever_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'PaymentLink' })
  payment_link_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, refPath: 'in_entity' })
  in_entity_id: Types.ObjectId;

  @Prop({
    required: false,
    enum: TransactionEntity,
  })
  in_entity: TransactionEntity;

  @Prop({ required: false, type: SchemaTypes.ObjectId, refPath: 'out_entity' })
  out_entity_id: Types.ObjectId;

  @Prop({
    required: false,
    enum: TransactionEntity,
  })
  out_entity: TransactionEntity;

  @Prop({
    required: false,
    enum: TransactionType,
    default: TransactionType.DEBIT,
  })
  type: TransactionType;

  @Prop({ required: true, unique: true })
  reference: string;

  @Prop({
    required: false,
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status?: TransactionStatus;

  @Prop()
  payment_date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.index({
  reference: -1,
});
