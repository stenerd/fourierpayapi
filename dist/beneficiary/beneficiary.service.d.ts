import { CoreService } from 'src/common/core/service.core';
import { PaystackService } from 'src/paystack/paystack.service';
import { BeneficiaryRepository } from './beneficiary.repository';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
export declare class BeneficiaryService extends CoreService<BeneficiaryRepository> {
    private readonly beneficiaryRepository;
    private readonly paystackService;
    constructor(beneficiaryRepository: BeneficiaryRepository, paystackService: PaystackService);
    createBeneficiary(dto: CreateBeneficiaryDto, user_id: string): Promise<void>;
    fetchBeneficiary(user_id: string): Promise<import("./beneficiary.model").BeneficiaryDocument[]>;
    removeBeneficiary(user_id: string, id: string): Promise<boolean>;
}
