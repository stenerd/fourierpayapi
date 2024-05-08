import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SchoolSessionDocument = SchoolSession & Document;

@Schema({ timestamps: true })
export class SchoolSession {
  _id?: any;

  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'SchoolData' })
  school_id: Types.ObjectId;

  @Prop({
    required: false,
    type: SchemaTypes.ObjectId,
    ref: 'SchoolSessionSetting',
  })
  session_setting_id: Types.ObjectId;
}

export const SchoolSessionSchema = SchemaFactory.createForClass(SchoolSession);
