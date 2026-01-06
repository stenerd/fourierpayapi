import { CommissionRepository } from './repositories/commission.repository';
import { PaymentAffiliateRepository } from 'src/payment-link-affiliate/repositories/payment-link-affiliate.repository';
import { Types } from 'mongoose';
import { IJWTUser } from 'src/auth/auth.interface';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
import { UserRepository } from 'src/user/user.repository';
export declare class CommissionService {
    private readonly commissionRepository;
    private readonly paymentAffiliateRepository;
    private readonly paymentLinkRepository;
    private readonly userRepository;
    constructor(commissionRepository: CommissionRepository, paymentAffiliateRepository: PaymentAffiliateRepository, paymentLinkRepository: PaymentLinkRepository, userRepository: UserRepository);
    createCommission(data: {
        affiliateId: Types.ObjectId;
        paymentId: Types.ObjectId;
        paymentLinkId: Types.ObjectId;
        tier: number;
        amount: number;
    }): Promise<void>;
    getAllAffiliates(currentUser: IJWTUser): Promise<any[]>;
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
    getAffiliatesWithEarnings(paymentLinkId: string, merchantId: string): Promise<{
        _id: string;
        affiliateCode: string;
        name: string;
        email: string;
        tier: 1 | 2;
        linksJoined: number;
        sales: number;
        earnings: number;
    }[]>;
    getAffiliatesForLink(paymentLinkId: string): Promise<any[]>;
    getAllCommissions(): Promise<import("./models/commission.model").CommissionDocument[]>;
}
