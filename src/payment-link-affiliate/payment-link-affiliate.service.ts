import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UpdatePaymentAffiliateDto } from './dto/update-payment-affiliate.dto';
import { PaymentAffiliate } from './models/payment-link-affiliate.model';
import { UserRepository } from 'src/user/user.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';

@Injectable()
export class PaymentLinkAffiliateService extends CoreService<PaymentAffiliateRepository> {
  constructor(
    private readonly paymentAffiliateRepository: PaymentAffiliateRepository,
    private readonly userRepository: UserRepository,
    private readonly paymentLinkRepository: PaymentLinkRepository,
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

  // Update commission amount for a specific participation
  async updateParticipation(
    id: string,
    dto: UpdatePaymentAffiliateDto,
    user_id: string,
  ) {
    const participation = await this.findOne({ _id: id });
    if (!participation) {
      throw new BadRequestException('Participation record not found');
    }

    if (dto.commissionAmount !== undefined) {
      participation.commissionAmount = dto.commissionAmount;
    }

    await this.updateOne(id, dto);

    return participation;
  }

  async getDashboardData(affiliateId: string) {
    const participations = await this.paymentAffiliateRepository.find(
      { affiliateId },
      {},
      {
        populate: [
          {
            path: 'paymentLinkId',
            select:
              'name amount link affiliateEnabled tier1FixedAmount tier2FixedAmount',
          },
        ],
      },
    );

    let totalEarnings = 0;
    let tier1Earnings = 0;
    let tier2Earnings = 0;
    const sharedLinks: any[] = [];

    for (const participation of participations) {
      const link = participation.paymentLinkId as any;
      const commission = participation.commissionAmount || 0;

      if (participation.tier === 1) {
        tier1Earnings += commission;
      } else if (participation.tier === 2) {
        tier2Earnings += commission;
      }
      totalEarnings += commission;

      // Safe handling: only add to sharedLinks if link is properly populated
      if (
        link &&
        link._id &&
        link.name &&
        link.amount !== undefined &&
        link.link
      ) {
        const existing = sharedLinks.find(
          (l) => l.paymentLinkId === link._id.toString(),
        );

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
}
