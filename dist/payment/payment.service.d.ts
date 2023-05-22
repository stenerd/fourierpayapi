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
import { ConfigService } from '@nestjs/config';
import { CoreService } from 'src/common/core/service.core';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
import { PaystackFactory } from 'src/paystack/paystack.factory';
import { PaystackService } from 'src/paystack/paystack.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { InitializePaymentDto } from './dto/initialize-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { ViewPaymentDto } from './dto/view-payment.dto';
import { IInitializePayment } from './payment.interface';
import { Payment } from './payment.model';
import { PaymentRepository } from './payment.repository';
export declare class PaymentService extends CoreService<PaymentRepository> {
    private readonly paymentRepository;
    private readonly paystackService;
    private readonly paystackFactory;
    private readonly paymentLinkService;
    private readonly transactionService;
    private readonly walletService;
    private readonly configService;
    private readonly userService;
    constructor(paymentRepository: PaymentRepository, paystackService: PaystackService, paystackFactory: PaystackFactory, paymentLinkService: PaymentLinkService, transactionService: TransactionService, walletService: WalletService, configService: ConfigService, userService: UserService);
    newPayment(data: IInitializePayment): Promise<Payment>;
    initializePayment(dto: InitializePaymentDto): Promise<Record<string, any>>;
    verifyPayment(dto: VerifyPaymentDto): Promise<Record<string, any>>;
    abandonPayment(dto: VerifyPaymentDto): Promise<Record<string, any>>;
    getPaymentByCode(code: any, query: ViewPaymentDto): Promise<{
        data: {
            payments: Omit<Payment & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, never>[];
            paymentLink: any;
            recievedAmount: number;
            numberOfRecipient: number;
        };
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    getExternalPayment(code: any, query: ViewPaymentDto): Promise<{
        data: {
            payments: Omit<import("../payment-link/models/payer-sheet.model").PayerSheet & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, never>[];
            paymentLink: import("../payment-link/models/payment-link.model").PaymentLink;
            recievedAmount: number;
            numberOfRecipient: number;
        };
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    } | {
        data: {
            payments: Omit<Payment & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, never>[];
            paymentLink: any;
            recievedAmount: number;
            numberOfRecipient: number;
        };
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    getPaymentReference(reference: any): Promise<any>;
}
