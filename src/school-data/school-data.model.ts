import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SchoolDataDocument = SchoolData & Document;

@Schema({ timestamps: true })
export class SchoolData {
  _id?: any;

  @Prop({ required: true })
  school_name: string;

  @Prop({ required: true })
  school_admin_name: string;

  @Prop({ required: true, unique: true })
  school_email: string;

  @Prop()
  school_mobile_number: string;

  @Prop()
  school_logo: string;

  @Prop()
  school_banner: string;

  @Prop()
  number_of_students: number;
}

export const SchoolDataSchema = SchemaFactory.createForClass(SchoolData);
