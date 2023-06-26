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
import { FieldTypeEnum, PaymentLinkStateEnum, PaymentLinkStatusEnum } from '../payment-link.enum';
export type PaymentLinkDocument = PaymentLink & Document;
export declare class Form extends Document {
    field_name: string;
    field_type: FieldTypeEnum;
    required: boolean;
    options?: string[];
}
export declare const FormSchema: import("mongoose").Schema<Form, import("mongoose").Model<Form, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Form>;
export declare class SheetUrl {
    publicId: string;
    secureUrl: string;
}
export declare class PaymentLink {
    _id?: any;
    link_id: Types.ObjectId;
    amount: number;
    charges: number;
    name: string;
    description: string;
    unique_field: string;
    priority_1: string;
    priority_2: string;
    priority_3: string;
    code: string;
    link: string;
    qr_code: string;
    expected_number_of_payments: number;
    recieved_payment: boolean;
    sheet_uploaded: boolean;
    status?: PaymentLinkStatusEnum;
    state?: PaymentLinkStateEnum;
    creator_id: Types.ObjectId;
    expires_at: Date;
    activate_public_link: boolean;
    sheetUrl: SheetUrl[];
    form?: Form[];
}
export declare const PaymentLinkSchema: import("mongoose").Schema<PaymentLink, import("mongoose").Model<PaymentLink, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentLink>;
