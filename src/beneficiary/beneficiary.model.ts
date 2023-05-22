import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type BeneficiaryDocument = Beneficiary & Document;

@Schema({ timestamps: true })
export class Beneficiary {
  _id?: any;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  account_number: string;

  @Prop({ required: true })
  bank_name: string;

  @Prop({ required: true })
  account_name: string;

  @Prop({ required: true })
  bank_code: string;
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);
