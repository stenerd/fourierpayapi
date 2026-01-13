import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommissionDocument = Commission & Document;

@Schema({ timestamps: true })
export class Commission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  affiliateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Payment', required: true })
  paymentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PaymentLink', required: true })
  paymentLinkId: Types.ObjectId;

  @Prop({ required: true, enum: [1, 2] })
  tier: 1 | 2;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'PENDING', enum: ['PENDING', 'PAID'] })
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);

// Useful indexes
CommissionSchema.index({ affiliateId: 1, createdAt: -1 });
CommissionSchema.index({ paymentId: 1 });
CommissionSchema.index({ paymentLinkId: 1, tier: 1 });
