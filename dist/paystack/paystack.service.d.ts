import { ConfigService } from '@nestjs/config';
import { ExternalApiCalls } from 'src/external-call/external-call.service';
import { ResolveAccountNumberDto } from './dto/resolve-account-number.dto';
import { IInitializePaystack, ITransferRecipient } from './paystack.interface';
export declare class PaystackService {
    private readonly configService;
    private readonly call;
    constructor(configService: ConfigService, call: ExternalApiCalls);
    initializePaystack(data: IInitializePaystack): Promise<Record<string, any>>;
    verifyPayment(reference: string): Promise<Record<string, any>>;
    fetchBankList(): Promise<Record<string, any>[]>;
    resolveAccountNumber(dto: ResolveAccountNumberDto): Promise<Record<string, any>[]>;
    transferRecipient(data: ITransferRecipient): Promise<any>;
    transfer(recipient: string, amount: number): Promise<any>;
}
