"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinkAffiliateService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const payment_link_affiliate_repository_1 = require("./repositories/payment-link-affiliate.repository");
const user_repository_1 = require("../user/user.repository");
const payment_link_repository_1 = require("../payment-link/repositories/payment-link.repository");
const payment_service_1 = require("../payment/payment.service");
const commission_repository_1 = require("../commissions/repositories/commission.repository");
const mongoose_1 = require("mongoose");
let PaymentLinkAffiliateService = class PaymentLinkAffiliateService extends service_core_1.CoreService {
    constructor(paymentAffiliateRepository, userRepository, paymentLinkRepository, paymentService, commissionRepository) {
        super(paymentAffiliateRepository);
        this.paymentAffiliateRepository = paymentAffiliateRepository;
        this.userRepository = userRepository;
        this.paymentLinkRepository = paymentLinkRepository;
        this.paymentService = paymentService;
        this.commissionRepository = commissionRepository;
    }
    async createParticipation(dto, user_id) {
        const paymentLink = await this.paymentLinkRepository.findOne({
            code: dto.paymentLinkId,
            affiliateEnabled: true,
        });
        console.log('dto.parentAffiliateCode:', dto.parentAffiliateCode);
        console.log('Current user_id:', user_id);
        if (!paymentLink) {
        }
        const affiliate = await this.userRepository.findOne({ _id: user_id });
        if (!affiliate || !affiliate.affiliateCode) {
            throw new common_1.BadRequestException('Invalid affiliate');
        }
        try {
            await this.paymentAffiliateRepository.create({
                affiliateId: affiliate._id,
                paymentLinkId: paymentLink._id,
                affiliateCode: affiliate.affiliateCode,
                tier: 1,
                commissionAmount: paymentLink.tier1FixedAmount || 0,
            });
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException('You have already joined this payment link. Visit your dashboard to see your shared links.');
            }
            throw error;
        }
        let tier2Record = null;
        if (dto.parentAffiliateCode) {
            const parentAffiliate = await this.userRepository.findOne({
                affiliateCode: dto.parentAffiliateCode,
            });
            console.log('Found parentAffiliate:', parentAffiliate ? parentAffiliate._id : 'NOT FOUND');
            console.log('Creating Tier 2 record with payload:', {
                affiliateId: parentAffiliate._id.toString(),
                paymentLinkId: paymentLink._id.toString(),
                affiliateCode: affiliate.affiliateCode,
                tier: 2,
                commissionAmount: paymentLink.tier2FixedAmount || 0,
            });
            const searchPayload = {
                affiliateId: parentAffiliate._id,
                paymentLinkId: paymentLink._id,
                affiliateCode: affiliate.affiliateCode,
                tier: 2,
            };
            console.log('Searching for existing Tier 2 record with:', searchPayload);
            const existingTier2 = await this.paymentAffiliateRepository.findOne(searchPayload);
            console.log('Existing Tier 2 record result:', existingTier2 ? existingTier2._id.toString() : 'NOT FOUND');
            if (parentAffiliate && parentAffiliate._id.toString() !== user_id) {
                try {
                    tier2Record = await this.paymentAffiliateRepository.create({
                        affiliateId: parentAffiliate._id,
                        paymentLinkId: paymentLink._id,
                        affiliateCode: affiliate.affiliateCode,
                        tier: 2,
                        commissionAmount: paymentLink.tier2FixedAmount || 0,
                    });
                }
                catch (error) {
                    if (error.code === 11000) {
                        console.log('Tier 2 participation already exists — skipped creation', error);
                    }
                    else {
                        console.error('Error creating Tier 2 participation:', error);
                        throw error;
                    }
                }
                console.log('Tier 2 record created:', tier2Record ? tier2Record._id : 'SKIPPED (duplicate or error)');
            }
        }
        return {
            shareableLink: `${paymentLink.link}?ref=${affiliate.affiliateCode}`,
            tier1Commission: paymentLink.tier1FixedAmount || 0,
            tier2Commission: paymentLink.tier2FixedAmount || 0,
            tier2Enabled: !!tier2Record,
        };
    }
    async getByPaymentLink(paymentLinkId, user_id) {
        const query = { paymentLinkId };
        const participations = await this.paymentAffiliateRepository.find(query, {}, {
            populate: [
                {
                    path: 'affiliateId',
                    select: 'firstname phonenumber affiliateCode',
                },
            ],
        });
        return participations;
    }
    async getByAffiliate(affiliateId) {
        const participations = await this.paymentAffiliateRepository.find({ affiliateId }, {}, {
            populate: [
                {
                    path: 'paymentLinkId',
                    select: 'name amount affiliateEnabled tier1FixedAmount tier2FixedAmount',
                },
            ],
        });
        return participations;
    }
    async getDashboardData(affiliateId) {
        const participations = await this.paymentAffiliateRepository.find({ affiliateId }, {}, {
            populate: [
                {
                    path: 'paymentLinkId',
                    select: 'name amount link',
                },
            ],
            lean: true,
        });
        if (participations.length === 0) {
            return {
                totalEarnings: 0,
                tier1Earnings: 0,
                tier2Earnings: 0,
                sharedLinksCount: 0,
                sharedLinks: [],
                recentCommissions: [],
            };
        }
        const commissions = await this.commissionRepository.find({ affiliateId: new mongoose_1.Types.ObjectId(affiliateId) }, {}, {
            sort: { createdAt: -1 },
            populate: [{ path: 'paymentLinkId', select: 'name' }],
            lean: true,
        });
        let totalEarnings = 0;
        let tier1Earnings = 0;
        let tier2Earnings = 0;
        commissions.forEach((comm) => {
            totalEarnings += comm.amount;
            if (comm.tier === 1)
                tier1Earnings += comm.amount;
            if (comm.tier === 2)
                tier2Earnings += comm.amount;
        });
        const linkEarningsMap = new Map();
        const linkSalesMap = new Map();
        commissions.forEach((comm) => {
            const linkId = comm.paymentLinkId._id.toString();
            linkEarningsMap.set(linkId, (linkEarningsMap.get(linkId) || 0) + comm.amount);
            linkSalesMap.set(linkId, (linkSalesMap.get(linkId) || 0) + 1);
        });
        const sharedLinks = participations.map((part) => {
            const link = part.paymentLinkId;
            const linkId = link._id.toString();
            const earned = linkEarningsMap.get(linkId) || 0;
            const sales = linkSalesMap.get(linkId) || 0;
            return {
                paymentLinkId: link._id.toString(),
                name: link.name,
                amount: link.amount,
                shareableLink: `${link.link}?ref=${part.affiliateCode}`,
                yourCommissionPerSale: part.commissionAmount || 0,
                tier: part.tier,
                paidSalesCount: sales,
                earnedFromThisLink: earned,
            };
        });
        const recentCommissions = commissions.slice(0, 10).map((comm) => {
            var _a;
            return ({
                date: comm.createdAt,
                linkName: ((_a = comm.paymentLinkId) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown',
                tier: comm.tier,
                amount: comm.amount,
            });
        });
        return {
            totalEarnings,
            tier1Earnings,
            tier2Earnings,
            sharedLinksCount: sharedLinks.length,
            sharedLinks,
            recentCommissions,
        };
    }
};
PaymentLinkAffiliateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_link_affiliate_repository_1.PaymentAffiliateRepository,
        user_repository_1.UserRepository,
        payment_link_repository_1.PaymentLinkRepository,
        payment_service_1.PaymentService,
        commission_repository_1.CommissionRepository])
], PaymentLinkAffiliateService);
exports.PaymentLinkAffiliateService = PaymentLinkAffiliateService;
//# sourceMappingURL=payment-link-affiliate.service.js.map