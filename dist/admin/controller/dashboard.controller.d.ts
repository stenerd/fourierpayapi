import { CoreController } from 'src/common/core/controller.core';
import { Response } from 'express';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { AdminDashboardService } from '../service/dashboard.service';
export declare class AdminDashboardController extends CoreController {
    private readonly adminDashboardService;
    constructor(adminDashboardService: AdminDashboardService);
    dashboard(res: Response, query: CoreSearchFilterDatePaginationDto): Promise<void>;
}
