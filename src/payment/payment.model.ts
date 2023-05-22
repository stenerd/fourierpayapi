// Third party libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { FieldTypeEnum } from 'src/payment-link/payment-link.enum';
import { TransactionStatus } from 'src/transaction/transaction.enum';

export type PaymentDocument = Payment & Document;

// Schema configuration

@Schema()
export class Form extends Document {
  @Prop({ required: true })
  field_name: string;

  @Prop({ required: true, enum: FieldTypeEnum })
  field_type: FieldTypeEnum;

  @Prop({ default: false })
  required: boolean;

  @Prop({ type: [String], default: [] })
  options?: string[];

  @Prop({ required: false })
  answer: string;
}
export const FormSchema = SchemaFactory.createForClass(Form);

@Schema({ timestamps: true })
export class Payment {
  _id?: any;

  @Prop({ required: true, default: 0.0 })
  amount: number;

  @Prop({ required: true, default: 0.0 })
  charges: number;

  @Prop({ required: false })
  unique_field: string;

  @Prop({ required: false })
  unique_answer: string;

  @Prop({ required: false })
  priority_1: string;

  @Prop({ required: false })
  priority_1_answer: string;

  @Prop({ required: false })
  priority_2: string;

  @Prop({ required: false })
  priority_2_answer: string;

  @Prop({ required: false })
  priority_3: string;

  @Prop({ required: false })
  priority_3_answer: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
  payer_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'Transaction' })
  transaction_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'PaymentLink' })
  payment_link_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'User' })
  reciever_id: Types.ObjectId;

  @Prop({ type: [FormSchema], default: [] })
  form?: Form[];

  @Prop({
    required: false,
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status?: TransactionStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({
  unique_answer: -1,
  priority_1_answer: -1,
  priority_2_answer: -1,
  priority_3_answer: -1,
});
