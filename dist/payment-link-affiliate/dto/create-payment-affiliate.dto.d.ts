declare enum AffiliateTier {
    TIER_1 = 1,
    TIER_2 = 2
}
export declare class CreatePaymentAffiliateDto {
    affiliateId: string;
    paymentLinkId: string;
    affiliateCode: string;
    tier: AffiliateTier;
    commissionAmount: number;
    parentAffiliateCode?: string;
}
export declare class UpdatePaymentAffiliateDto {
    commissionAmount?: number;
}
export {};
