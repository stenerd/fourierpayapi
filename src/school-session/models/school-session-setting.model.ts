import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SchoolSessionSettingDocument = SchoolSessionSetting & Document;

@Schema({ timestamps: true })
export class SchoolSessionSetting {
  _id?: any;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  start_year: string;

  @Prop({ required: true })
  end_year: string;
}

export const SchoolSessionSettingSchema =
  SchemaFactory.createForClass(SchoolSessionSetting);
