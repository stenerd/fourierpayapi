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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { BaseMetaData } from "./basemetadata.model";
export type FacultyMetadataDocument = FacultyMetadata & Document;
export type LevelMetadataDocument = LevelMetadata & Document;
export type DepartmentMetadataDocument = DepartmentMetadata & Document;
export type InstitutionMetadataDocument = InstitionMetadata & Document;
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
export declare const FacultyMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const DepartmentMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const LevelMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
export declare const InstitutionMetadataSchema: import("mongoose").Schema<FacultyMetadata, import("mongoose").Model<FacultyMetadata, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FacultyMetadata>;
