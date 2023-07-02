import { ViewPaymentLinkDto } from 'src/payment-link/dto/create-payment-link.dto';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
export declare class AdminPaymentLinkService {
    private readonly paymentLinkService;
    constructor(paymentLinkService: PaymentLinkService);
    paymentLinks(query: ViewPaymentLinkDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    paymentLinksCount(query: ViewPaymentLinkDto): Promise<{
        data: {
            all: number;
            private: number;
            public: number;
            allPercentage: number;
            publicPercentage: number;
            privatePercentage: number;
            showPercent: boolean;
        };
    }>;
}
