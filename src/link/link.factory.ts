import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Link } from './link.model';

@Injectable()
export class LinkFactory {
  createDefault(length: number, user_id: string): Record<string, any>[] {
    const result: Record<string, any>[] = [];

    for (let i = 0; i < length; i++) {
      const link = new Link();
      link.user_id = new Types.ObjectId(user_id);
      result.push(link);
    }

    return result;
  }
}
