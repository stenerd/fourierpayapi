import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { CommissionService } from './commission.service';
import { IJWTUser } from 'src/auth/auth.interface';
export declare class CommissionController extends CoreController {
    private readonly commissionService;
    constructor(commissionService: CommissionService);
    getAffiliateDashboard(currentUser: IJWTUser, res: Response): Promise<void>;
    getByPaymentLink(paymentLinkId: string, currentUser: IJWTUser, res: Response): Promise<void>;
    getByAffiliate(affiliateId: string, currentUser: IJWTUser, res: Response): Promise<void>;
    getAll(query: any, currentUser: IJWTUser, res: Response): Promise<void>;
    markAsPaid(id: string, currentUser: IJWTUser, res: Response): Promise<void>;
}
