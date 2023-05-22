import { PaymentLinkService } from './payment-link.service';
import { ChangePaymentLinkStatusDto, CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { ViewPaymentDto } from 'src/payment/dto/view-payment.dto';
export declare class PaymentLinkController extends CoreController {
    private readonly paymentLinkService;
    constructor(paymentLinkService: PaymentLinkService);
    createPaymentLink(createUserDto: CreatePaymentLinkDto, currentUser: IJWTUser, res: Response): Promise<void>;
    changePaymentLinkStatus(dto: ChangePaymentLinkStatusDto, currentUser: IJWTUser, code: string, res: Response): Promise<void>;
    changePaymentLinkToPublicState(currentUser: IJWTUser, code: string, res: Response): Promise<void>;
    changePaymentLinkToPrivateState(currentUser: IJWTUser, file: any, code: string, res: Response): Promise<void>;
    getPayerSheet(currentUser: IJWTUser, code: string, res: Response, query: ViewPaymentDto): Promise<void>;
    activatePublicLink(currentUser: IJWTUser, code: string, res: Response): Promise<void>;
    getPaymentLink(currentUser: IJWTUser, res: Response): Promise<void>;
    singlePaymentLink(res: Response, code: string): Promise<void>;
}
