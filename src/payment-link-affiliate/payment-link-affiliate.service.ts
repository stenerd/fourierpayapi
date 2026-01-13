import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
import { TransactionStatus } from 'src/transaction/transaction.enum';
import { PaymentService } from 'src/payment/payment.service';
import { CommissionRepository } from 'src/commissions/repositories/commission.repository';
import { Types } from 'mongoose';

@Injectable()
export class PaymentLinkAffiliateService extends CoreService<PaymentAffiliateRepository> {
  constructor(
    private readonly paymentAffiliateRepository: PaymentAffiliateRepository,
    private readonly userRepository: UserRepository,
    private readonly paymentLinkRepository: PaymentLinkRepository,
    private readonly paymentService: PaymentService,
    private readonly commissionRepository: CommissionRepository,
  ) {
    super(paymentAffiliateRepository);
  }

  // Create participation record (when affiliate starts sharing a link)
  async createParticipation(dto: CreatePaymentAffiliateDto, user_id: string) {
    const paymentLink = await this.paymentLinkRepository.findOne({
      code: dto.paymentLinkId,
      affiliateEnabled: true,
    });
    console.log('dto.parentAffiliateCode:', dto.parentAffiliateCode);

    console.log('Current user_id:', user_id);
    if (!paymentLink) {
      // throw new BadRequestException(
      //   'Payment link not found or affiliate program not enabled',
      // );
    }

    const affiliate = await this.userRepository.findOne({ _id: user_id });
    if (!affiliate || !affiliate.affiliateCode) {
      throw new BadRequestException('Invalid affiliate');
    }

    try {
      // Try to create Tier 1 record
      await this.paymentAffiliateRepository.create({
        affiliateId: affiliate._id,
        paymentLinkId: paymentLink._id,
        affiliateCode: affiliate.affiliateCode,
        tier: 1,
        commissionAmount: paymentLink.tier1FixedAmount || 0,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'You have already joined this payment link. Visit your dashboard to see your shared links.',
        );
      }
      throw error;
    }

    let tier2Record = null;

    if (dto.parentAffiliateCode) {      
      const parentAffiliate = await this.userRepository.findOne({
        affiliateCode: dto.parentAffiliateCode,
      });
      console.log(
        'Found parentAffiliate:',
        parentAffiliate ? parentAffiliate._id : 'NOT FOUND',
      );

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

      const existingTier2 = await this.paymentAffiliateRepository.findOne(
        searchPayload,
      );

      console.log(
        'Existing Tier 2 record result:',
        existingTier2 ? existingTier2._id.toString() : 'NOT FOUND',
      );

      if (parentAffiliate && parentAffiliate._id.toString() !== user_id) {
        try {
          tier2Record = await this.paymentAffiliateRepository.create({
            affiliateId: parentAffiliate._id,
            paymentLinkId: paymentLink._id,
            affiliateCode: affiliate.affiliateCode, // ← child's code
            tier: 2,
            commissionAmount: paymentLink.tier2FixedAmount || 0,
          });
        } catch (error) {
          if (error.code === 11000) {
            console.log(
              'Tier 2 participation already exists — skipped creation',
              error,
            );
          } else {
            console.error('Error creating Tier 2 participation:', error);
            throw error;
          }
        }

        console.log(
          'Tier 2 record created:',
          tier2Record ? tier2Record._id : 'SKIPPED (duplicate or error)',
        );
      }
    }

    return {
      shareableLink: `${paymentLink.link}?ref=${affiliate.affiliateCode}`,
      tier1Commission: paymentLink.tier1FixedAmount || 0,
      tier2Commission: paymentLink.tier2FixedAmount || 0,
      tier2Enabled: !!tier2Record,
    };
  }

  // Get all participation for a specific payment link (merchant view)
  async getByPaymentLink(paymentLinkId: string, user_id: string | null) {
    const query = { paymentLinkId };
    // If not superadmin, filter by creator? (optional — you can add logic later)
    const participations = await this.paymentAffiliateRepository.find(
      query,
      {},
      {
        populate: [
          {
            path: 'affiliateId',
            select: 'firstname phonenumber affiliateCode',
          },
        ],
      },
    );

    return participations;
  }

  // Get all links an affiliate is participating in
  async getByAffiliate(affiliateId: string) {
    const participations = await this.paymentAffiliateRepository.find(
      { affiliateId },
      {},
      {
        populate: [
          {
            path: 'paymentLinkId',
            select:
              'name amount affiliateEnabled tier1FixedAmount tier2FixedAmount',
          },
        ],
      },
    );

    return participations;
  }

  async getDashboardData(affiliateId: string) {
    // Get all participations for this affiliate (links joined)
    const participations = await this.paymentAffiliateRepository.find(
      { affiliateId },
      {},
      {
        populate: [
          {
            path: 'paymentLinkId',
            select: 'name amount link',
          },
        ],
        lean: true,
      },
    );

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

    // Get all commissions for this affiliate
    const commissions = await this.commissionRepository.find(
      { affiliateId: new Types.ObjectId(affiliateId) },
      {},
      {
        sort: { createdAt: -1 },
        populate: [{ path: 'paymentLinkId', select: 'name' }],
        lean: true,
      },
    );

    // Calculate earnings from actual commissions
    let totalEarnings = 0;
    let tier1Earnings = 0;
    let tier2Earnings = 0;

    commissions.forEach((comm) => {
      totalEarnings += comm.amount;
      if (comm.tier === 1) tier1Earnings += comm.amount;
      if (comm.tier === 2) tier2Earnings += comm.amount;
    });

    // Group commissions by link for per-link earnings
    const linkEarningsMap = new Map<string, number>();
    const linkSalesMap = new Map<string, number>();

    commissions.forEach((comm) => {
      const linkId = comm.paymentLinkId._id.toString();
      linkEarningsMap.set(
        linkId,
        (linkEarningsMap.get(linkId) || 0) + comm.amount,
      );
      linkSalesMap.set(linkId, (linkSalesMap.get(linkId) || 0) + 1);
    });

    // Build shared links list
    const sharedLinks = participations.map((part) => {
      const link = part.paymentLinkId as any;
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

    // Recent commissions (latest 10)
    const recentCommissions = commissions.slice(0, 10).map((comm: any) => ({
      date: comm.createdAt,
      linkName: comm.paymentLinkId?.name || 'Unknown',
      tier: comm.tier,
      amount: comm.amount,
    }));

    return {
      totalEarnings,
      tier1Earnings,
      tier2Earnings,
      sharedLinksCount: sharedLinks.length,
      sharedLinks,
      recentCommissions,
    };
  }
}
