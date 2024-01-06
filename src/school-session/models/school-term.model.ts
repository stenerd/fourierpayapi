import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SchoolTermDocument = SchoolTerm & Document;

@Schema({ timestamps: true })
export class SchoolTerm {
  _id?: any;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'SchoolData' })
  school_id: Types.ObjectId;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
    ref: 'SchoolSessionSetting',
  })
  session_setting_id: Types.ObjectId;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
    ref: 'SchoolSession',
  })
  session_id: Types.ObjectId;
}

export const SchoolTermSchema = SchemaFactory.createForClass(SchoolTerm);
