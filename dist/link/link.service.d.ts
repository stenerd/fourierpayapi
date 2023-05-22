import { CoreService } from 'src/common/core/service.core';
import { LinkFactory } from './link.factory';
import { LinkRepository } from './link.repository';
export declare class LinkService extends CoreService<LinkRepository> {
    private readonly repository;
    private readonly factory;
    constructor(repository: LinkRepository, factory: LinkFactory);
    createDefaultLinks(user_id: string, length: number): Promise<void>;
}
