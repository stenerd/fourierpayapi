import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes, Types } from "mongoose";
import { Department, DepartmentMetadata, FacultyMetadata, InstitionMetadata } from "src/metadata/model/metadata.model";
import { User } from "src/user/user.model";

export type LecturerDocument = Lecturer & Document

@Schema({ timestamps: true })
export class Lecturer extends Document {
    _id?: any;

    @Prop({ type: String })
    position: string

    @Prop({ type: SchemaTypes.ObjectId, ref: InstitionMetadata.name })
    institution: Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: FacultyMetadata.name })
    faculty: Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: DepartmentMetadata.name })
    department: Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    user: Types.ObjectId

}

export const LecturerSchema = SchemaFactory.createForClass(Lecturer)