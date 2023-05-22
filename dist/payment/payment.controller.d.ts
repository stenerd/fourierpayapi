import { PaymentService } from './payment.service';
import { CoreController } from 'src/common/core/controller.core';
import { InitializePaymentDto } from './dto/initialize-payment.dto';
import { Response } from 'express';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { IJWTUser } from 'src/auth/auth.interface';
import { ViewPaymentDto } from './dto/view-payment.dto';
export declare class PaymentController extends CoreController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initializePayment(initializePaymentDto: InitializePaymentDto, res: Response): Promise<void>;
    verifyPayment(dto: VerifyPaymentDto, res: Response): Promise<void>;
    abandonPayment(dto: VerifyPaymentDto, res: Response): Promise<void>;
    getPaymentLink(currentUser: IJWTUser, res: Response, code: string, query: ViewPaymentDto): Promise<void>;
    getExternalPayment(res: Response, code: string, query: ViewPaymentDto): Promise<void>;
    getPaymentReference(res: Response, reference: string): Promise<void>;
}
