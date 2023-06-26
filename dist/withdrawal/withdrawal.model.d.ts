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
export type WithdrawalDocument = Withdrawal & Document;
export declare class Withdrawal {
    _id?: any;
    user_id: Types.ObjectId;
    amount: number;
    charges: number;
    account_number: string;
    bank_name: string;
    name: string;
    bank_code: string;
    recipient_code: string;
    transfer_code: string;
    paystack_reference: string;
    payload: any;
    transaction_id: Types.ObjectId;
    status?: TransactionStatus;
}
export declare const WithdrawalSchema: import("mongoose").Schema<Withdrawal, import("mongoose").Model<Withdrawal, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Withdrawal>;
