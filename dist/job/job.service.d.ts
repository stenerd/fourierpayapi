import { PaymentLinkService } from 'src/payment-link/payment-link.service';
export declare class JobService {
    private readonly paymentLinkService;
    constructor(paymentLinkService: PaymentLinkService);
    paymentLinkStatusJob(): Promise<boolean>;
}
