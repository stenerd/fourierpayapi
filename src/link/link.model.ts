// Third party libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { LinkUsageEnum } from './link.enum';

export type LinkDocument = Link & Document;

// Schema configuration

@Schema({ timestamps: true })
export class Link {
  _id?: any;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ required: true, default: 'default' })
  link_name: string;

  @Prop({ required: false, default: null })
  number_of_payment: number;

  @Prop({
    required: false,
    enum: LinkUsageEnum,
    default: LinkUsageEnum.AVAILABLE,
  })
  usage?: LinkUsageEnum;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
