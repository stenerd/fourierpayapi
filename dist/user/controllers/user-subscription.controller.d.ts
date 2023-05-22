import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { FetchSubscriptionSettingFilterDto, SubscribeDto } from 'src/subscription/dto/create-subscription-setting.dto';
export declare class UserSubscriptionController extends CoreController {
    private readonly service;
    constructor(service: SubscriptionService);
    fetchSubscriptions(currentUser: IJWTUser, query: FetchSubscriptionSettingFilterDto, res: Response): Promise<void>;
    subscribe(currentUser: IJWTUser, dto: SubscribeDto, res: Response): Promise<void>;
}
