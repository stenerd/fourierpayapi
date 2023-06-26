// Third party libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import {
  FieldTypeEnum,
  PaymentLinkStateEnum,
  PaymentLinkStatusEnum,
} from '../payment-link.enum';

export type PaymentLinkDocument = PaymentLink & Document;

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
}
export const FormSchema = SchemaFactory.createForClass(Form);

@Schema({ timestamps: true })
export class SheetUrl {
  @Prop({ required: false })
  publicId: string;

  @Prop({ required: false })
  secureUrl: string;
}

@Schema({ timestamps: true })
export class PaymentLink {
  _id?: any;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Link' })
  link_id: Types.ObjectId;

  @Prop({ required: true, default: 0.0 })
  amount: number;

  @Prop({ required: true, default: 0.0 })
  charges: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  unique_field: string;

  @Prop({ required: false })
  priority_1: string;

  @Prop({ required: false })
  priority_2: string;

  @Prop({ required: false })
  priority_3: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, unique: true })
  link: string;

  @Prop({ required: true })
  qr_code: string;

  @Prop({ required: true, default: 0 })
  expected_number_of_payments: number;

  @Prop({ default: false })
  recieved_payment: boolean;

  @Prop({ default: false, required: false })
  sheet_uploaded: boolean;

  @Prop({
    required: false,
    enum: PaymentLinkStatusEnum,
    default: PaymentLinkStatusEnum.INACTIVE,
  })
  status?: PaymentLinkStatusEnum;

  @Prop({
    required: false,
    enum: PaymentLinkStateEnum,
    default: PaymentLinkStateEnum.PUBLIC,
  })
  state?: PaymentLinkStateEnum;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  creator_id: Types.ObjectId;

  @Prop()
  expires_at: Date;

  @Prop({ default: false })
  activate_public_link: boolean;

  @Prop({ type: Types.Array })
  sheetUrl: SheetUrl[];

  @Prop({ type: [FormSchema], default: [] })
  form?: Form[];
}

export const PaymentLinkSchema = SchemaFactory.createForClass(PaymentLink);
