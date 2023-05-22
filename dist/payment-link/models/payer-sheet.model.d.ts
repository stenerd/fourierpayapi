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
import { Document, Types } from 'mongoose';
import { TransactionStatus } from 'src/transaction/transaction.enum';
export type PayerSheetDocument = PayerSheet & Document;
export declare class PayerSheet {
    _id?: any;
    unique_answer: string;
    priority_1_answer: string;
    priority_2_answer: string;
    priority_3_answer: string;
    payment_link_id: Types.ObjectId;
    creator_id: Types.ObjectId;
    payment_id: Types.ObjectId;
    payment_date: Date;
    status?: TransactionStatus;
}
export declare const PayerSheetSchema: import("mongoose").Schema<PayerSheet, import("mongoose").Model<PayerSheet, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayerSheet>;
