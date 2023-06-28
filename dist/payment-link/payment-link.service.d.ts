/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { CoreService } from 'src/common/core/service.core';
import { ExcelService } from 'src/file-processor/excel-processor.service';
import { LinkService } from 'src/link/link.service';
import { ChangePaymentLinkStatusDto, CreatePaymentLinkDto, ViewPaymentLinkDto } from './dto/create-payment-link.dto';
import { PaymentLinkFactory } from './payment-link.factory';
import { PaymentLinkRepository } from './repositories/payment-link.repository';
import { PayerSheetRepository } from './repositories/payer_sheet.repository';
import { ViewPaymentDto } from 'src/payment/dto/view-payment.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PaymentLink } from './models/payment-link.model';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
export declare class PaymentLinkService extends CoreService<PaymentLinkRepository> {
    private readonly paymentLinkRepository;
    private readonly payerSheetRepository;
    private readonly paymentLinkFactory;
    private readonly linkService;
    private readonly configService;
    private readonly excelService;
    private readonly cloudinaryService;
    private readonly qRCodeService;
    constructor(paymentLinkRepository: PaymentLinkRepository, payerSheetRepository: PayerSheetRepository, paymentLinkFactory: PaymentLinkFactory, linkService: LinkService, configService: ConfigService, excelService: ExcelService, cloudinaryService: CloudinaryService, qRCodeService: QRCodeService);
    generateCode(): Promise<string>;
    createPaymentLink(dto: CreatePaymentLinkDto, user_id: string): Promise<void>;
    changePaymentLinkStatus(dto: ChangePaymentLinkStatusDto, code: string, user_id: string): Promise<void>;
    changePaymentLinkToPublicState(code: string, user_id: string): Promise<any>;
    activatePublicLink(code: string, user_id: string): Promise<any>;
    changePaymentLinkToPrivateState(file: any, code: string, user_id: string, buffer: Buffer): Promise<any>;
    getPayerData(payment_link_id: string, unique_answer: string): Promise<import("./models/payer-sheet.model").PayerSheetDocument>;
    updatePayerInfo(query: Record<string, any>, data: Record<string, any>): Promise<import("./models/payer-sheet.model").PayerSheetDocument>;
    getPaymentLink(user_id?: string): Promise<import("./models/payment-link.model").PaymentLinkDocument[]>;
    getAllPaymentLink(query: Record<string, any>): Promise<PaymentLink[]>;
    singlePaymentLink(code: string): Promise<import("./models/payment-link.model").PaymentLinkDocument>;
    getPayerSheet(code: string, query: ViewPaymentDto, user_id: string): Promise<{
        data: Omit<import("./models/payer-sheet.model").PayerSheet & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    getExternalPaymentData(query: Record<string, any>, paymentLink: PaymentLink): Promise<{
        data: {
            payments: Omit<import("./models/payer-sheet.model").PayerSheet & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, never>[];
            paymentLink: PaymentLink;
            recievedAmount: number;
            numberOfRecipient: number;
        };
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    dashboardPaymentLink(query: CoreSearchFilterDatePaginationDto): Promise<{
        totalAll: number;
    }>;
    adminPaymentLink(query: ViewPaymentLinkDto): Promise<{
        data: Omit<PaymentLink & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
}
