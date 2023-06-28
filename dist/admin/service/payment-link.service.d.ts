import { ViewPaymentLinkDto } from 'src/payment-link/dto/create-payment-link.dto';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
export declare class AdminPaymentLinkService {
    private readonly paymentLinkService;
    constructor(paymentLinkService: PaymentLinkService);
    paymentLinks(query: ViewPaymentLinkDto): Promise<{
        data: Omit<import("../../payment-link/models/payment-link.model").PaymentLink & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
}
