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
let PaymentLinkAffiliateService = class PaymentLinkAffiliateService extends service_core_1.CoreService {
    constructor(paymentAffiliateRepository, userRepository, paymentLinkRepository) {
        super(paymentAffiliateRepository);
        this.paymentAffiliateRepository = paymentAffiliateRepository;
        this.userRepository = userRepository;
        this.paymentLinkRepository = paymentLinkRepository;
    }
    async createParticipation(dto, user_id) {
        const paymentLink = await this.paymentLinkRepository.findOne({
            _id: dto.paymentLinkId,
            affiliateEnabled: true,
        });
        if (!paymentLink) {
            throw new common_1.BadRequestException('Payment link not found or affiliate program not enabled');
        }
        const affiliate = await this.userRepository.findOne({ _id: user_id });
        if (!affiliate || !affiliate.affiliateCode) {
            throw new common_1.BadRequestException('Invalid affiliate');
        }
        const tier1Record = await this.paymentAffiliateRepository.create({
            affiliateId: affiliate._id,
            paymentLinkId: paymentLink._id,
            affiliateCode: affiliate.affiliateCode,
            tier: 1,
            commissionAmount: paymentLink.tier1FixedAmount || 0,
        });
        let tier2Record = null;
        if (dto.parentAffiliateCode) {
            const parentAffiliate = await this.userRepository.findOne({
                affiliateCode: dto.parentAffiliateCode,
            });
            if (parentAffiliate && parentAffiliate._id.toString() !== user_id) {
                tier2Record = await this.paymentAffiliateRepository.create({
                    affiliateId: parentAffiliate._id,
                    paymentLinkId: paymentLink._id,
                    affiliateCode: parentAffiliate.affiliateCode,
                    tier: 2,
                    commissionAmount: paymentLink.tier2FixedAmount || 0,
                });
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
                    select: 'name amount link affiliateEnabled tier1FixedAmount tier2FixedAmount',
                },
            ],
        });
        let totalEarnings = 0;
        let tier1Earnings = 0;
        let tier2Earnings = 0;
        const sharedLinks = [];
        for (const participation of participations) {
            const link = participation.paymentLinkId;
            const commission = participation.commissionAmount || 0;
            if (participation.tier === 1) {
                tier1Earnings += commission;
            }
            else if (participation.tier === 2) {
                tier2Earnings += commission;
            }
            totalEarnings += commission;
            if (link &&
                link._id &&
                link.name &&
                link.amount !== undefined &&
                link.link) {
                const existing = sharedLinks.find((l) => l.paymentLinkId === link._id.toString());
                if (!existing) {
                    sharedLinks.push({
                        paymentLinkId: link._id.toString(),
                        name: link.name,
                        amount: link.amount,
                        shareableLink: `${link.link}?ref=${participation.affiliateCode}`,
                        yourCommissionPerSale: commission,
                        tier: participation.tier,
                    });
                }
            }
        }
        return {
            totalEarnings,
            tier1Earnings,
            tier2Earnings,
            sharedLinksCount: sharedLinks.length,
            sharedLinks,
        };
    }
};
PaymentLinkAffiliateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_link_affiliate_repository_1.PaymentAffiliateRepository,
        user_repository_1.UserRepository,
        payment_link_repository_1.PaymentLinkRepository])
], PaymentLinkAffiliateService);
exports.PaymentLinkAffiliateService = PaymentLinkAffiliateService;
//# sourceMappingURL=payment-link-affiliate.service.js.map