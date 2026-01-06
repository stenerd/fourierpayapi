import { Injectable, NotFoundException } from '@nestjs/common';
import { CommissionRepository } from './repositories/commission.repository';
import { PaymentAffiliateRepository } from 'src/payment-link-affiliate/repositories/payment-link-affiliate.repository';
import { Types } from 'mongoose';
import { RoleEnum } from 'src/user/user.enum';
import { IJWTUser } from 'src/auth/auth.interface';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
import { UserRepository } from 'src/user/user.repository';
@Injectable()
export class CommissionService {
  constructor(
    private readonly commissionRepository: CommissionRepository,
    private readonly paymentAffiliateRepository: PaymentAffiliateRepository,
    private readonly paymentLinkRepository: PaymentLinkRepository,
    private readonly userRepository: UserRepository,
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

  async getAllAffiliates(currentUser: IJWTUser) {
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

    const commissionMap = new Map<string, number>();
    commissions.forEach((comm) => {
      const affId = comm.affiliateId.toString();
      const current = commissionMap.get(affId) || 0;
      commissionMap.set(affId, current + comm.amount);
    });

    const affiliateMap = new Map<string, any>();

    for (const participation of participations) {
      const affId = participation.affiliateId.toString();

      if (!affiliateMap.has(affId)) {
        const user = await this.userRepository.findOne({
          _id: participation.affiliateId,
        });

        affiliateMap.set(affId, {
          _id: affId,
          affiliateCode: user?.affiliateCode || 'N/A',
          name:
            `${user?.firstname || ''} ${user?.lastname || ''}`.trim() ||
            'Unknown',
          email: user?.email || 'N/A',
          linksJoined: 0,
          sales: 0,
          earnings: 0,
        });
      }

      const aff = affiliateMap.get(affId);
      aff.linksJoined += 1;
      aff.earnings = commissionMap.get(affId) || 0;
      aff.sales = commissions.filter(
        (c) => c.affiliateId.toString() === affId,
      ).length;
    }

    return Array.from(affiliateMap.values()).sort(
      (a, b) => b.earnings - a.earnings,
    );
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

  async getAffiliatesWithEarnings(paymentLinkId: string, merchantId: string) {
    const participations = await this.paymentAffiliateRepository.find({
      paymentLinkId: new Types.ObjectId(paymentLinkId),
    });

    // Optional: restrict to merchant's link
    // Add check if needed

    const affiliateIds = participations.map((p) => p.affiliateId.toString());

    // Get users
    const users = await this.userRepository.find({
      _id: { $in: affiliateIds },
    });

    // Get commissions for earnings
    const commissions = await this.commissionRepository.find({
      paymentLinkId: new Types.ObjectId(paymentLinkId),
    });

    const commissionMap = new Map<string, number>();
    commissions.forEach((c) => {
      const id = c.affiliateId.toString();
      commissionMap.set(id, (commissionMap.get(id) || 0) + c.amount);
    });

    // Build list
    return participations.map((part) => {
      const user = users.find(
        (u) => u._id.toString() === part.affiliateId.toString(),
      );
      const earnings = commissionMap.get(part.affiliateId.toString()) || 0;
      const sales = commissions.filter(
        (c) => c.affiliateId.toString() === part.affiliateId.toString(),
      ).length;

      return {
        _id: part.affiliateId.toString(),
        affiliateCode: part.affiliateCode,
        name:
          `${user?.firstname || ''} ${user?.lastname || ''}`.trim() ||
          'Unknown',
        email: user?.email || 'N/A',
        tier: part.tier,
        linksJoined: 1, // since it's per link
        sales,
        earnings,
      };
    });
  }

  async getAffiliatesForLink(paymentLinkId: string) {
    const participations = await this.paymentAffiliateRepository.find({
      paymentLinkId: new Types.ObjectId(paymentLinkId),
    });

    if (participations.length === 0) {
      return [];
    }

    const commissions = await this.commissionRepository.find({
      paymentLinkId: new Types.ObjectId(paymentLinkId),
    });

    const commissionMap = new Map<string, number>();
    commissions.forEach((comm) => {
      const affId = comm.affiliateId.toString();
      const current = commissionMap.get(affId) || 0;
      commissionMap.set(affId, current + comm.amount);
    });

    const affiliateMap = new Map<string, any>();

    for (const participation of participations) {
      const affId = participation.affiliateId.toString();

      if (!affiliateMap.has(affId)) {
        const user = await this.userRepository.findOne({
          _id: participation.affiliateId,
        });

        affiliateMap.set(affId, {
          _id: affId,
          affiliateCode: user?.affiliateCode || 'N/A',
          name:
            `${user?.firstname || ''} ${user?.lastname || ''}`.trim() ||
            'Unknown',
          email: user?.email || 'N/A',
          linksJoined: 0,
          sales: 0,
          earnings: 0,
        });
      }

      const aff = affiliateMap.get(affId);
      aff.linksJoined += 1;
      aff.earnings = commissionMap.get(affId) || 0;
      aff.sales = commissions.filter(
        (c) => c.affiliateId.toString() === affId,
      ).length;
    }

    return Array.from(affiliateMap.values()).sort(
      (a, b) => b.earnings - a.earnings,
    );
  }

  async getAllCommissions() {
    return await this.commissionRepository.find(
      {},
      {},
      {
        sort: { createdAt: -1 },
        populate: [
          {
            path: 'affiliateId',
            select: 'firstname lastname email affiliateCode',
          },
          { path: 'paymentLinkId', select: 'name' },
          { path: 'paymentId', select: 'reference' },
        ],
        lean: true,
      },
    );
  }
}
