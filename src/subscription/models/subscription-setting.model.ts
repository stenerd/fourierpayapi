import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  SubscriptionNameEnum,
  SubscriptionTagEnum,
} from '../subscription.enum';
import { Document } from 'mongoose';

export type SubscriptionSettingDocument = SubscriptionSetting & Document;

@Schema({ timestamps: true })
export class SubscriptionSetting {
  _id?: any;

  @Prop({
    required: true,
    enum: SubscriptionNameEnum,
    default: SubscriptionNameEnum.BASIC,
  })
  name: SubscriptionNameEnum;

  @Prop({
    required: true,
    enum: SubscriptionTagEnum,
    default: SubscriptionTagEnum.BASIC,
  })
  tag: SubscriptionTagEnum;

  @Prop({ required: true, default: 0.0 })
  amount: number;

  @Prop({ required: true, default: false })
  active: boolean;
}

export const SubscriptionSettingSchema =
  SchemaFactory.createForClass(SubscriptionSetting);
