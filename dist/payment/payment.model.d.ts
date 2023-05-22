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
import { FieldTypeEnum } from 'src/payment-link/payment-link.enum';
import { TransactionStatus } from 'src/transaction/transaction.enum';
export type PaymentDocument = Payment & Document;
export declare class Form extends Document {
    field_name: string;
    field_type: FieldTypeEnum;
    required: boolean;
    options?: string[];
    answer: string;
}
export declare const FormSchema: import("mongoose").Schema<Form, import("mongoose").Model<Form, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Form>;
export declare class Payment {
    _id?: any;
    amount: number;
    charges: number;
    unique_field: string;
    unique_answer: string;
    priority_1: string;
    priority_1_answer: string;
    priority_2: string;
    priority_2_answer: string;
    priority_3: string;
    priority_3_answer: string;
    payer_id: Types.ObjectId;
    transaction_id: Types.ObjectId;
    payment_link_id: Types.ObjectId;
    reciever_id: Types.ObjectId;
    form?: Form[];
    status?: TransactionStatus;
}
export declare const PaymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment>;
