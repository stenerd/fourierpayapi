import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseMetaData } from "./basemetadata.model";
import { Document, SchemaTypes, Types } from "mongoose";

export type FacultyMetadataDocument = FacultyMetadata & Document;
export type LevelMetadataDocument = LevelMetadata & Document;
export type DepartmentMetadataDocument = DepartmentMetadata & Document;
export type InstitutionMetadataDocument = InstitionMetadata & Document;
export type FacultyDocument = Faculty & Document;
export type LevelDocument = Level & Document;
export type DepartmentDocument = Department & Document;
export type InstitutionDocument = Institution & Document;

@Schema({ timestamps: true })
export class FacultyMetadata extends BaseMetaData {
    @Prop({ type: Boolean, default: false })
    is_deleted: boolean
}

@Schema({ timestamps: true })
export class DepartmentMetadata extends BaseMetaData {
    @Prop({ type: Boolean, default: false })
    is_deleted: boolean
}

@Schema({ timestamps: true })
export class LevelMetadata extends BaseMetaData {
    @Prop({ type: Boolean, default: false })
    is_deleted: boolean
}

@Schema({ timestamps: true })
export class InstitionMetadata extends BaseMetaData {
    @Prop({ type: Boolean, default: false })
    is_deleted: boolean
}

@Schema({ timestamps: true })
export class Faculty extends Document {
    _id_any

    @Prop({ type: SchemaTypes.ObjectId })
    institution_id: Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: FacultyMetadata.name })
    faculty_id: Types.ObjectId

}

@Schema({ timestamps: true })
export class Institution extends Document {
    _id: any

    @Prop({ type: SchemaTypes.ObjectId, ref: InstitionMetadata.name })
    institution_id: Types.ObjectId
}

@Schema({ timestamps: true })
export class Department extends Document {
    _id?: any;

    @Prop({ type: SchemaTypes.ObjectId, ref: Institution.name })
    institution_id: Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: Faculty.name })
    faculty_id: Types.ObjectId
}

@Schema({ timestamps: true })
export class Level extends Document {
    _id?: any;

    @Prop({ type: SchemaTypes.ObjectId, ref: LevelMetadata.name })
    level_id: Types.ObjectId
}

export const FacultyMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const DepartmentMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const LevelMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const InstitutionMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const InstitutionSchema = SchemaFactory.createForClass(Institution)
export const DepartmentSchema = SchemaFactory.createForClass(Department)
export const LevelSchema = SchemaFactory.createForClass(Level)
export const FacultySchema = SchemaFactory.createForClass(Faculty)



