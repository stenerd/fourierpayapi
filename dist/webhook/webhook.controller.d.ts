import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { WebhookService } from './webhook.service';
export declare class WebhookController extends CoreController {
    private readonly walletService;
    constructor(walletService: WebhookService);
    webhook(res: Response, body: Record<string, any>): Promise<void>;
    webhookFix(res: Response): Promise<void>;
}
