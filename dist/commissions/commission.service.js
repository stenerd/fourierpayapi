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
exports.CommissionService = void 0;
const common_1 = require("@nestjs/common");
const commission_repository_1 = require("./repositories/commission.repository");
const payment_link_affiliate_repository_1 = require("../payment-link-affiliate/repositories/payment-link-affiliate.repository");
const mongoose_1 = require("mongoose");
const user_enum_1 = require("../user/user.enum");
const payment_link_repository_1 = require("../payment-link/repositories/payment-link.repository");
const user_repository_1 = require("../user/user.repository");
let CommissionService = class CommissionService {
    constructor(commissionRepository, paymentAffiliateRepository, paymentLinkRepository, userRepository) {
        this.commissionRepository = commissionRepository;
        this.paymentAffiliateRepository = paymentAffiliateRepository;
        this.paymentLinkRepository = paymentLinkRepository;
        this.userRepository = userRepository;
    }
    async createCommission(data) {
        await this.commissionRepository.create({
            affiliateId: data.affiliateId,
            paymentId: data.paymentId,
            paymentLinkId: data.paymentLinkId,
            tier: data.tier,
            amount: data.amount,
            status: 'PENDING',
        });
    }
    async getAllAffiliates(currentUser) {
        const paymentLinks = await this.paymentLinkRepository.find({
            creator_id: currentUser._id,
        });
        const paymentLinkIds = paymentLinks.map((link) => link._id);
        if (paymentLinkIds.length === 0) {
            return [];
        }
        const participations = await this.paymentAffiliateRepository.find({
            paymentLinkId: { $in: paymentLinkIds },
        });
        if (participations.length === 0) {
            return [];
        }
        const commissions = await this.commissionRepository.find({
            paymentLinkId: { $in: paymentLinkIds },
        });
        const commissionMap = new Map();
        commissions.forEach((comm) => {
            const affId = comm.affiliateId.toString();
            const current = commissionMap.get(affId) || 0;
            commissionMap.set(affId, current + comm.amount);
        });
        const affiliateMap = new Map();
        for (const participation of participations) {
            const affId = participation.affiliateId.toString();
            if (!affiliateMap.has(affId)) {
                const user = await this.userRepository.findOne({
                    _id: participation.affiliateId,
                });
                affiliateMap.set(affId, {
                    _id: affId,
                    affiliateCode: (user === null || user === void 0 ? void 0 : user.affiliateCode) || 'N/A',
                    name: `${(user === null || user === void 0 ? void 0 : user.firstname) || ''} ${(user === null || user === void 0 ? void 0 : user.lastname) || ''}`.trim() ||
                        'Unknown',
                    email: (user === null || user === void 0 ? void 0 : user.email) || 'N/A',
                    linksJoined: 0,
                    sales: 0,
                    earnings: 0,
                });
            }
            const aff = affiliateMap.get(affId);
            aff.linksJoined += 1;
            aff.earnings = commissionMap.get(affId) || 0;
            aff.sales = commissions.filter((c) => c.affiliateId.toString() === affId).length;
        }
        return Array.from(affiliateMap.values()).sort((a, b) => b.earnings - a.earnings);
    }
    async getAffiliateDashboard(affiliateId) {
        const commissions = await this.commissionRepository.find({ affiliateId: new mongoose_1.Types.ObjectId(affiliateId) }, {}, { sort: { createdAt: -1 } });
        const totalEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);
        const tier1Earnings = commissions
            .filter((c) => c.tier === 1)
            .reduce((sum, c) => sum + c.amount, 0);
        const tier2Earnings = commissions
            .filter((c) => c.tier === 2)
            .reduce((sum, c) => sum + c.amount, 0);
        return {
            totalEarnings,
            tier1Earnings,
            tier2Earnings,
            recentCommissions: commissions.slice(0, 10).map((c) => ({
                paymentLinkName: 'Link Name',
                tier: c.tier,
                amount: c.amount,
                date: c.createdAt.toISOString().split('T')[0],
            })),
        };
    }
    async getByPaymentLink(paymentLinkId, merchantId) {
        const query = { paymentLinkId: new mongoose_1.Types.ObjectId(paymentLinkId) };
        if (merchantId) {
        }
        const commissions = await this.commissionRepository.find(query, {}, { sort: { createdAt: -1 } });
        return commissions;
    }
    async getByAffiliate(affiliateId) {
        const commissions = await this.commissionRepository.find({ affiliateId: new mongoose_1.Types.ObjectId(affiliateId) }, {}, { sort: { createdAt: -1 } });
        return commissions;
    }
    async getAll(query, currentUser) {
        const filter = {};
        if (query.affiliateId)
            filter.affiliateId = new mongoose_1.Types.ObjectId(query.affiliateId);
        if (query.paymentLinkId)
            filter.paymentLinkId = new mongoose_1.Types.ObjectId(query.paymentLinkId);
        if (query.tier)
            filter.tier = Number(query.tier);
        if (query.status)
            filter.status = query.status;
        if (currentUser.role !== user_enum_1.RoleEnum.SUPERADMIN) {
        }
        const page = Number(query.page) || 1;
        const perPage = Number(query.perPage) || 20;
        const [commissions, total] = await Promise.all([
            this.commissionRepository.find(filter, {}, {
                sort: { createdAt: -1 },
                skip: (page - 1) * perPage,
                limit: perPage,
            }),
            this.commissionRepository.count(filter),
        ]);
        return {
            data: commissions,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / perPage),
            },
        };
    }
    async markAsPaid(id, currentUser) {
        const commission = await this.commissionRepository.findById(id);
        if (!commission) {
            throw new common_1.NotFoundException('Commission not found');
        }
        return await this.commissionRepository.updateOne(id, { status: 'PAID' });
    }
};
CommissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [commission_repository_1.CommissionRepository,
        payment_link_affiliate_repository_1.PaymentAffiliateRepository,
        payment_link_repository_1.PaymentLinkRepository,
        user_repository_1.UserRepository])
], CommissionService);
exports.CommissionService = CommissionService;
//# sourceMappingURL=commission.service.js.map