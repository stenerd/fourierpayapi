import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { LinkDocument } from './link.model';
export declare class LinkRepository extends CoreRepository<LinkDocument> {
    constructor(linkModel: Model<LinkDocument>);
}
