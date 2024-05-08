import { Response } from 'express';
import { CoreController } from 'src/common/core/controller.core';
import { ChangeSubscriptionSettingStateDto, CreateSubscriptionSettingDto, FetchSubscriptionSettingFilterDto } from '../dto/create-subscription-setting.dto';
import { SubscriptionSettingService } from '../services/subscription-setting.service';
export declare class SubscriptionSettingController extends CoreController {
    private readonly service;
    constructor(service: SubscriptionSettingService);
    createSubscriptionSetting(dto: CreateSubscriptionSettingDto, res: Response): Promise<void>;
    fetchSubscriptionSetting(filterDto: FetchSubscriptionSettingFilterDto, res: Response): Promise<void>;
    changeSubscriptionSettingState(id: string, dto: ChangeSubscriptionSettingStateDto, res: Response): Promise<void>;
}
