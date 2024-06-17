import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseMetaData } from "./basemetadata.model";

export type FacultyMetadataDocument = FacultyMetadata & Document;
export type LevelMetadataDocument = LevelMetadata & Document;
export type DepartmentMetadataDocument = DepartmentMetadata & Document;
export type InstitutionMetadataDocument = InstitionMetadata & Document;

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

export const FacultyMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const DepartmentMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const LevelMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)
export const InstitutionMetadataSchema = SchemaFactory.createForClass(FacultyMetadata)


