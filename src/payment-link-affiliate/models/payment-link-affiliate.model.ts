import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentAffiliateDocument = PaymentAffiliate & Document;

@Schema({ timestamps: true })
export class PaymentAffiliate {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  affiliateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PaymentLink', required: true })
  paymentLinkId: Types.ObjectId;

  @Prop({ required: true })
  affiliateCode: string;

  @Prop({ required: true, enum: [1, 2] })
  tier: 1 | 2;

  @Prop({ type: Number, required: true })
  commissionAmount: number; // fixed amount in ₦ (e.g., 5000.00)

  // Optional: if you want to store the original merchant default at the time of joining
  // @Prop({ type: Number })
  // originalDefaultAmount?: number;
}

export const PaymentAffiliateSchema =
  SchemaFactory.createForClass(PaymentAffiliate);

// Critical indexes for performance
PaymentAffiliateSchema.index(
  { paymentLinkId: 1, affiliateCode: 1, tier: 1 },
  { unique: true },
);
PaymentAffiliateSchema.index({ affiliateId: 1 });
PaymentAffiliateSchema.index({ paymentLinkId: 1 });
