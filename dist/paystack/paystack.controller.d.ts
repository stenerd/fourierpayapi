import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { PaystackService } from './paystack.service';
import { ResolveAccountNumberDto } from './dto/resolve-account-number.dto';
export declare class PaystackController extends CoreController {
    private readonly paystackService;
    constructor(paystackService: PaystackService);
    fetchBankList(res: Response): Promise<void>;
    resolveAccountNumber(res: Response, dto: ResolveAccountNumberDto): Promise<void>;
}
