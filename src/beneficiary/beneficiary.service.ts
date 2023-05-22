import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { PaystackService } from 'src/paystack/paystack.service';
import { BeneficiaryRepository } from './beneficiary.repository';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';

@Injectable()
export class BeneficiaryService extends CoreService<BeneficiaryRepository> {
  constructor(
    private readonly beneficiaryRepository: BeneficiaryRepository,
    private readonly paystackService: PaystackService,
  ) {
    super(beneficiaryRepository);
  }

  async createBeneficiary(dto: CreateBeneficiaryDto, user_id: string) {
    const resolve_acc_number: Record<string, any> =
      await this.paystackService.resolveAccountNumber({
        bank_code: dto.bank_code,
        account_number: dto.account_number,
      });

    await this.create({
      user_id,
      account_number: dto.account_number,
      bank_name: dto.bank_name,
      account_name: resolve_acc_number.account_name,
      bank_code: dto.bank_code,
    });
  }

  async fetchBeneficiary(user_id: string) {
    const resp = await this.beneficiaryRepository.find({ user_id });
    return resp;
  }

  async removeBeneficiary(user_id: string, id: string) {
    console.log('sjdzv >> ', user_id, id);
    const resp = await this.beneficiaryRepository.deleteMany({
      user_id,
      _id: id,
    });
    return resp;
  }
}
