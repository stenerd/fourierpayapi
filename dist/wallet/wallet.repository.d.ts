import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { WalletDocument } from './wallet.model';
export declare class WalletRepository extends CoreRepository<WalletDocument> {
    constructor(walletModel: Model<WalletDocument>);
}
