import { Response } from 'express';
export declare class CoreController {
    responseSuccess(res: Response, res_code: string, res_des: string, data: any, code: number): Promise<void>;
}
