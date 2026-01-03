import { CommissionRepository } from './repositories/commission.repository';
import { PaymentAffiliateRepository } from 'src/payment-link-affiliate/repositories/payment-link-affiliate.repository';
import { Types } from 'mongoose';
export declare class CommissionService {
    private readonly commissionRepository;
    private readonly paymentAffiliateRepository;
    constructor(commissionRepository: CommissionRepository, paymentAffiliateRepository: PaymentAffiliateRepository);
    createCommission(data: {
        affiliateId: Types.ObjectId;
        paymentId: Types.ObjectId;
        paymentLinkId: Types.ObjectId;
        tier: number;
        amount: number;
    }): Promise<void>;
    getAffiliateDashboard(affiliateId: string): Promise<{
        totalEarnings: number;
        tier1Earnings: number;
        tier2Earnings: number;
        recentCommissions: {
            paymentLinkName: string;
            tier: 1 | 2;
            amount: number;
            date: string;
        }[];
    }>;
    getByPaymentLink(paymentLinkId: string, merchantId: string | null): Promise<import("./models/commission.model").CommissionDocument[]>;
    getByAffiliate(affiliateId: string): Promise<import("./models/commission.model").CommissionDocument[]>;
    getAll(query: any, currentUser: any): Promise<{
        data: import("./models/commission.model").CommissionDocument[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    markAsPaid(id: string, currentUser: any): Promise<import("./models/commission.model").CommissionDocument>;
}
