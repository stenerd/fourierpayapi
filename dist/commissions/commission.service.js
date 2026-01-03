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
let CommissionService = class CommissionService {
    constructor(commissionRepository, paymentAffiliateRepository) {
        this.commissionRepository = commissionRepository;
        this.paymentAffiliateRepository = paymentAffiliateRepository;
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
        payment_link_affiliate_repository_1.PaymentAffiliateRepository])
], CommissionService);
exports.CommissionService = CommissionService;
//# sourceMappingURL=commission.service.js.map