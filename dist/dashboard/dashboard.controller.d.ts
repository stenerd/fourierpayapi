import { Response } from 'express';
import { IJWTUser } from 'src/auth/auth.interface';
import { CoreController } from 'src/common/core/controller.core';
import { DashboardService } from './dashboard.service';
import { ChartQueryDto } from './dto/chart-query.dto';
export declare class DashboardController extends CoreController {
    private readonly service;
    constructor(service: DashboardService);
    getDashboardMatrix(currentUser: IJWTUser, res: Response): Promise<void>;
    getDashboardTables(currentUser: IJWTUser, res: Response): Promise<void>;
    getDashboardChart(currentUser: IJWTUser, data: ChartQueryDto, res: Response): Promise<void>;
    getProfileTables(currentUser: IJWTUser, res: Response): Promise<void>;
}
