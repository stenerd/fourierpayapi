import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Commission, CommissionDocument } from '../models/commission.model';
import { CoreRepository } from 'src/common/core/repository.core';

@Injectable()
export class CommissionRepository extends CoreRepository<CommissionDocument> {
  constructor(
    @InjectModel('Commission') commissionModel: Model<CommissionDocument>,
  ) {
    super(commissionModel); // ✅ Pass the model directly, not a function
  }

  async count(query: any): Promise<number> {
    return this.model().countDocuments(query).exec();
  }

  async findById(id: string): Promise<CommissionDocument | null> {
    return this.model().findById(id).exec();
  }

  async updateOne(id: string, update: any): Promise<CommissionDocument | null> {
    return this.model().findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
