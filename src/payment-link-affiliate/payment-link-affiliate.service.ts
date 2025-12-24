import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { PaymentAffiliateRepository } from './repositories/payment-link-affiliate.repository';
import { CreatePaymentAffiliateDto } from './dto/create-payment-affiliate.dto';
import { UpdatePaymentAffiliateDto } from './dto/update-payment-affiliate.dto';
import { PaymentAffiliate } from './models/payment-link-affiliate.model';

@Injectable()
export class PaymentLinkAffiliateService extends CoreService<PaymentAffiliateRepository> {
  constructor(
    private readonly paymentAffiliateRepository: PaymentAffiliateRepository,
  ) {
    super(paymentAffiliateRepository);
  }

  // Create participation record (when affiliate starts sharing a link)
  async createParticipation(dto: CreatePaymentAffiliateDto, user_id: string) {
    // Check if already exists (prevent duplicates)
    const existing = await this.paymentAffiliateRepository.findOne({
      paymentLinkId: dto.paymentLinkId,
      affiliateCode: dto.affiliateCode,
    });
    if (existing) {
      throw new BadRequestException(
        'This affiliate is already participating in this link',
      );
    }

    // Create the record
    const participation = await this.paymentAffiliateRepository.create({
      affiliateId: dto.affiliateId,
      paymentLinkId: dto.paymentLinkId,
      affiliateCode: dto.affiliateCode,
      tier: dto.tier,
      commissionAmount: dto.commissionAmount,
    });

    return participation;
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
}
