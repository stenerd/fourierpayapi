import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { BeneficiaryDocument } from './beneficiary.model';

@Injectable()
export class BeneficiaryRepository extends CoreRepository<BeneficiaryDocument> {
  constructor(
    @InjectModel('Beneficiary')
    beneficiarymodel: Model<BeneficiaryDocument>,
  ) {
    super(beneficiarymodel);
  }
}
