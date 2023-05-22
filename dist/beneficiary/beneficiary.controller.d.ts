import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { CoreController } from 'src/common/core/controller.core';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
export declare class BeneficiaryController extends CoreController {
    private readonly beneficiaryService;
    constructor(beneficiaryService: BeneficiaryService);
    createBeneficiary(dto: CreateBeneficiaryDto, currentUser: IJWTUser, res: Response): Promise<void>;
    fetchBeneficiary(currentUser: IJWTUser, res: Response): Promise<void>;
    removeBeneficiary(currentUser: IJWTUser, id: string, res: Response): Promise<void>;
}
