import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { WithdrawalDocument } from './withdrawal.model';

@Injectable()
export class WithdrawalRepository extends CoreRepository<WithdrawalDocument> {
  constructor(
    @InjectModel('Withdrawal')
    withdrawalModel: Model<WithdrawalDocument>,
  ) {
    super(withdrawalModel);
  }
}
