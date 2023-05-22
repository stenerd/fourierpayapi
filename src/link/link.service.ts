import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { LinkFactory } from './link.factory';
import { LinkRepository } from './link.repository';

@Injectable()
export class LinkService extends CoreService<LinkRepository> {
  constructor(
    private readonly repository: LinkRepository,
    private readonly factory: LinkFactory,
  ) {
    super(repository);
  }

  async createDefaultLinks(user_id: string, length: number) {
    const payload = this.factory.createDefault(length, user_id);
    await this.repository.createMany(payload);
  }
}
