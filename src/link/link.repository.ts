import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { LinkDocument } from './link.model';

@Injectable()
export class LinkRepository extends CoreRepository<LinkDocument> {
  constructor(
    @InjectModel('Link')
    linkModel: Model<LinkDocument>,
  ) {
    super(linkModel);
  }
}
