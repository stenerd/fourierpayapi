import { WalletService } from './wallet.service';
import { walletWithdrawalDto } from './dto/create-wallet.dto';
import { CoreController } from 'src/common/core/controller.core';
import { IJWTUser } from 'src/auth/auth.interface';
import { Response } from 'express';
export declare class WalletController extends CoreController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createWallet(currentUser: IJWTUser, res: Response): Promise<void>;
    walletWithdraw(currentUser: IJWTUser, dto: walletWithdrawalDto, res: Response): Promise<void>;
    getWallet(currentUser: IJWTUser, res: Response): Promise<void>;
    webhook(res: Response, body: Record<string, any>): Promise<void>;
}
