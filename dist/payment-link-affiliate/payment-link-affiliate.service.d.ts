import { CoreService } from 'src/common/core/service.core';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UpdatePaymentAffiliateDto } from './dto/update-payment-affiliate.dto';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
export declare class PaymentLinkAffiliateService extends CoreService<PaymentAffiliateRepository> {
    private readonly paymentAffiliateRepository;
    private readonly userRepository;
    private readonly paymentLinkRepository;
    constructor(paymentAffiliateRepository: PaymentAffiliateRepository, userRepository: UserRepository, paymentLinkRepository: PaymentLinkRepository);
    createParticipation(dto: CreatePaymentAffiliateDto, user_id: string): Promise<{
        shareableLink: string;
        tier1Commission: number;
        tier2Commission: number;
        tier2Enabled: boolean;
    }>;
    getByPaymentLink(paymentLinkId: string, user_id: string | null): Promise<import("./models/payment-link-affiliate.model").PaymentAffiliateDocument[]>;
    getByAffiliate(affiliateId: string): Promise<import("./models/payment-link-affiliate.model").PaymentAffiliateDocument[]>;
    updateParticipation(id: string, dto: UpdatePaymentAffiliateDto, user_id: string): Promise<any>;
    getDashboardData(affiliateId: string): Promise<{
        totalEarnings: number;
        tier1Earnings: number;
        tier2Earnings: number;
        sharedLinksCount: number;
        sharedLinks: any[];
    }>;
}
