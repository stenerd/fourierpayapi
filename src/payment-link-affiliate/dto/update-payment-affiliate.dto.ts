import { PartialType } from '@nestjs/swagger';
import { CreatePaymentAffiliateDto } from './create-payment-affiliate.dto';

export class UpdatePaymentAffiliateDto extends PartialType(
  CreatePaymentAffiliateDto,
) {}
