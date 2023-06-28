import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { AdminPaymentLinkService } from '../service/payment-link.service';
import { ViewPaymentLinkDto } from 'src/payment-link/dto/create-payment-link.dto';
export declare class AdminPaymentLinkController extends CoreController {
    private readonly adminPaymentLinkService;
    constructor(adminPaymentLinkService: AdminPaymentLinkService);
    paymentLinks(res: Response, query: ViewPaymentLinkDto): Promise<void>;
}
