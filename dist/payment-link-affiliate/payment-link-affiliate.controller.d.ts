import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { PaymentLinkAffiliateService } from './payment-link-affiliate.service';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UpdatePaymentAffiliateDto } from './dto/update-payment-affiliate.dto';
import { IJWTUser } from 'src/auth/auth.interface';
export declare class PaymentLinkAffiliateController extends CoreController {
    private readonly paymentLinkAffiliateService;
    constructor(paymentLinkAffiliateService: PaymentLinkAffiliateService);
    create(dto: CreatePaymentAffiliateDto, currentUser: IJWTUser, res: Response): Promise<void>;
    getByLink(paymentLinkId: string, currentUser: IJWTUser, res: Response): Promise<void>;
    getByAffiliate(affiliateId: string, currentUser: IJWTUser, res: Response): Promise<void>;
    update(id: string, dto: UpdatePaymentAffiliateDto, currentUser: IJWTUser, res: Response): Promise<void>;
    getDashboard(currentUser: IJWTUser, res: Response): Promise<void>;
}
