// Third party libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { TransactionStatus } from 'src/transaction/transaction.enum';

export type PayerSheetDocument = PayerSheet & Document;

@Schema({ timestamps: true })
export class PayerSheet {
  _id?: any;

  @Prop({ required: false })
  unique_answer: string;

  @Prop({ required: false })
  priority_1_answer: string;

  @Prop({ required: false })
  priority_2_answer: string;

  @Prop({ required: false })
  priority_3_answer: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'PaymentLink' })
  payment_link_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'User' })
  creator_id: Types.ObjectId;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
    ref: 'Payment',
    default: null,
  })
  payment_id: Types.ObjectId;

  @Prop({ required: false })
  payment_date: Date;

  @Prop({
    required: false,
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status?: TransactionStatus;
}

export const PayerSheetSchema = SchemaFactory.createForClass(PayerSheet);

PayerSheetSchema.index({
  unique_answer: -1,
  priority_1_answer: -1,
  priority_2_answer: -1,
  priority_3_answer: -1,
});
