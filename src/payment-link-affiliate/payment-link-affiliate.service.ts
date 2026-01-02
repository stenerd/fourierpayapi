import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
import { TransactionStatus } from 'src/transaction/transaction.enum';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class PaymentLinkAffiliateService extends CoreService<PaymentAffiliateRepository> {
  constructor(
    private readonly paymentAffiliateRepository: PaymentAffiliateRepository,
    private readonly userRepository: UserRepository,
    private readonly paymentLinkRepository: PaymentLinkRepository,
    private readonly paymentService: PaymentService,
  ) {
    super(paymentAffiliateRepository);
  }

  // Create participation record (when affiliate starts sharing a link)
  async createParticipation(dto: CreatePaymentAffiliateDto, user_id: string) {
    // Find the payment link
    const paymentLink = await this.paymentLinkRepository.findOne({
      _id: dto.paymentLinkId,
      affiliateEnabled: true,
    });

    if (!paymentLink) {
      throw new BadRequestException(
        'Payment link not found or affiliate program not enabled',
      );
    }

    // Get current affiliate user
    const affiliate = await this.userRepository.findOne({ _id: user_id });
    if (!affiliate || !affiliate.affiliateCode) {
      throw new BadRequestException('Invalid affiliate');
    }

    // Create Tier 1 record (direct sharer)
    const tier1Record = await this.paymentAffiliateRepository.create({
      affiliateId: affiliate._id,
      paymentLinkId: paymentLink._id,
      affiliateCode: affiliate.affiliateCode,
      tier: 1,
      commissionAmount: paymentLink.tier1FixedAmount || 0,
    });

    let tier2Record = null;

    // Create Tier 2 record if parent ref is provided
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

    // Return the shareable link with current affiliate's code
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
    // Get all participations for this affiliate (to know links, tiers, rates)
    const participations = await this.paymentAffiliateRepository.find(
      { affiliateId },
      {},
      {
        populate: [
          {
            path: 'paymentLinkId',
            select: 'name amount link tier1FixedAmount tier2FixedAmount',
          },
        ],
      },
    );

    // Get the affiliate's code for querying payments
    const affiliate = await this.userRepository.findOne({ _id: affiliateId });
    if (!affiliate || !affiliate.affiliateCode) {
      return {
        totalEarnings: 0,
        tier1Earnings: 0,
        tier2Earnings: 0,
        sharedLinksCount: 0,
        sharedLinks: [],
      };
    }

    const affiliateCode = affiliate.affiliateCode;

    // Find all PAID payments that used this affiliate's code
    const paidPayments = await this.paymentService.findPayments({
      affiliateCode,
      status: TransactionStatus.PAID,
    });

    let totalEarnings = 0;
    let tier1Earnings = 0;
    let tier2Earnings = 0;

    const paymentCounts = new Map<string, number>(); // paymentLinkId → count of paid payments

    for (const payment of paidPayments) {
      const participation = participations.find(
        (p) =>
          p.paymentLinkId._id.toString() === payment.payment_link_id.toString(),
      );

      if (!participation) continue;

      const commission = participation.commissionAmount || 0;

      if (participation.tier === 1) {
        tier1Earnings += commission;
      } else if (participation.tier === 2) {
        tier2Earnings += commission;
      }
      totalEarnings += commission;

      // Count payments per link
      const linkId = participation.paymentLinkId._id.toString();
      paymentCounts.set(linkId, (paymentCounts.get(linkId) || 0) + 1);
    }

    // Build shared links list
    const sharedLinks = participations.map((participation) => {
      const link = participation.paymentLinkId as any;
      const linkId = link._id.toString();
      const paidCount = paymentCounts.get(linkId) || 0;

      return {
        paymentLinkId: linkId,
        name: link.name,
        amount: link.amount,
        shareableLink: `${link.link}?ref=${participation.affiliateCode}`,
        yourCommissionPerSale: participation.commissionAmount || 0,
        tier: participation.tier,
        paidSalesCount: paidCount,
        earnedFromThisLink: (participation.commissionAmount || 0) * paidCount,
      };
    });

    return {
      totalEarnings,
      tier1Earnings,
      tier2Earnings,
      sharedLinksCount: sharedLinks.length,
      sharedLinks,
    };
  }
}
