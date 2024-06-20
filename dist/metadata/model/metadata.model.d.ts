/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { BaseMetaData } from "./basemetadata.model";
import { Document, Types } from "mongoose";
export type FacultyMetadataDocument = FacultyMetadata & Document;
export type LevelMetadataDocument = LevelMetadata & Document;
export type DepartmentMetadataDocument = DepartmentMetadata & Document;
export type InstitutionMetadataDocument = InstitionMetadata & Document;
export type FacultyDocument = Faculty & Document;
export type LevelDocument = Level & Document;
export type DepartmentDocument = Department & Document;
export type InstitutionDocument = Institution & Document;
export declare class FacultyMetadata extends BaseMetaData {
    is_deleted: boolean;
}
export declare class DepartmentMetadata extends BaseMetaData {
    is_deleted: boolean;
}
export declare class LevelMetadata extends BaseMetaData {
    is_deleted: boolean;
}
export declare class InstitionMetadata extends BaseMetaData {
    is_deleted: boolean;
}
export declare class Faculty extends Document {
    _id_any: any;
    institution_id: Types.ObjectId;
    faculty_id: Types.ObjectId;
}
export declare class Institution extends Document {
    _id: any;
    institution_id: Types.ObjectId;
}
export declare class Department extends Document {
    _id?: any;
    institution_id: Types.ObjectId;
    faculty_id: Types.ObjectId;
}
export declare class Level extends Document {
    _id?: any;
    level_id: Types.ObjectId;
}
export declare const FacultyMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const DepartmentMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const LevelMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const InstitutionMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const InstitutionSchema: import("mongoose").Schema<Institution, import("mongoose").Model<Institution, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Institution>;
export declare const DepartmentSchema: import("mongoose").Schema<Department, import("mongoose").Model<Department, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Department>;
export declare const LevelSchema: import("mongoose").Schema<Level, import("mongoose").Model<Level, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Level>;
export declare const FacultySchema: import("mongoose").Schema<Faculty, import("mongoose").Model<Faculty, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Faculty>;
