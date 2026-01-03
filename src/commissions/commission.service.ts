import { Injectable, NotFoundException } from '@nestjs/common';
import { CommissionRepository } from './repositories/commission.repository';
import { PaymentAffiliateRepository } from 'src/payment-link-affiliate/repositories/payment-link-affiliate.repository';
import { Types } from 'mongoose';
import { RoleEnum } from 'src/user/user.enum';

@Injectable()
export class CommissionService {
  constructor(
    private readonly commissionRepository: CommissionRepository,
    private readonly paymentAffiliateRepository: PaymentAffiliateRepository,
  ) {}

  // Internal — called from PaymentService on successful payment
  async createCommission(data: {
    affiliateId: Types.ObjectId;
    paymentId: Types.ObjectId;
    paymentLinkId: Types.ObjectId;
    tier: number;
    amount: number;
  }) {
    await this.commissionRepository.create({
      affiliateId: data.affiliateId,
      paymentId: data.paymentId,
      paymentLinkId: data.paymentLinkId,
      tier: data.tier,
      amount: data.amount,
      status: 'PENDING',
    });
  }

  // 1. Affiliate dashboard — earnings + commission history
  async getAffiliateDashboard(affiliateId: string) {
    const commissions = await this.commissionRepository.find(
      { affiliateId: new Types.ObjectId(affiliateId) },
      {},
      { sort: { createdAt: -1 } },
    );

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
        paymentLinkName: 'Link Name', // you can populate later
        tier: c.tier,
        amount: c.amount,
        date: c.createdAt.toISOString().split('T')[0],
      })),
    };
  }

  // 2. All commissions for a specific payment link (merchant view)
  async getByPaymentLink(paymentLinkId: string, merchantId: string | null) {
    const query: any = { paymentLinkId: new Types.ObjectId(paymentLinkId) };
    if (merchantId) {
      // Optional: restrict to merchant's links if needed
      // Add logic if you have creator_id on payment link
    }

    const commissions = await this.commissionRepository.find(
      query,
      {},
      { sort: { createdAt: -1 } },
    );

    return commissions;
  }

  // 3. All commissions for a specific affiliate
  async getByAffiliate(affiliateId: string) {
    const commissions = await this.commissionRepository.find(
      { affiliateId: new Types.ObjectId(affiliateId) },
      {},
      { sort: { createdAt: -1 } },
    );

    return commissions;
  }

  // 4. Global list of all commissions (with optional filters)
  async getAll(query: any, currentUser: any) {
    // Basic filters (you can expand)
    const filter: any = {};

    if (query.affiliateId)
      filter.affiliateId = new Types.ObjectId(query.affiliateId);
    if (query.paymentLinkId)
      filter.paymentLinkId = new Types.ObjectId(query.paymentLinkId);
    if (query.tier) filter.tier = Number(query.tier);
    if (query.status) filter.status = query.status;

    // Restrict to merchant's links if not admin (optional)
    if (currentUser.role !== RoleEnum.SUPERADMIN) {
      // Add logic if needed
    }

    const page = Number(query.page) || 1;
    const perPage = Number(query.perPage) || 20;

    const [commissions, total] = await Promise.all([
      this.commissionRepository.find(
        filter,
        {},
        {
          sort: { createdAt: -1 },
          skip: (page - 1) * perPage,
          limit: perPage,
        },
      ),
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

  // 5. Mark commission as paid
  async markAsPaid(id: string, currentUser: any) {
    const commission = await this.commissionRepository.findById(id);
    if (!commission) {
      throw new NotFoundException('Commission not found');
    }

    // Optional: check permission (merchant owns the link or admin)
    // if (currentUser.role !== RoleEnum.SUPERADMIN && ...) { ... }

    return await this.commissionRepository.updateOne(id, { status: 'PAID' });
  }
}
