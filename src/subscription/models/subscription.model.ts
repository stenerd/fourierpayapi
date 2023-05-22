import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  _id?: any;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'SubscriptionSetting' })
  subscription_setting_id: Types.ObjectId;

  @Prop({ required: true, default: false })
  is_active: boolean;

  @Prop({ default: null })
  expires_on: Date;

  @Prop()
  start_date: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
