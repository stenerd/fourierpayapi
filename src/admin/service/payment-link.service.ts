import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { ViewPaymentLinkDto } from 'src/payment-link/dto/create-payment-link.dto';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';

@Injectable()
export class AdminPaymentLinkService {
  constructor(private readonly paymentLinkService: PaymentLinkService) {}

  async paymentLinks(query: ViewPaymentLinkDto) {
    const resp = await this.paymentLinkService.adminPaymentLink(query);
    return resp;
  }

  async paymentLinksCount(query: ViewPaymentLinkDto) {
    const resp = await this.paymentLinkService.adminPaymentLinksCount(query);
    return resp;
  }
}
