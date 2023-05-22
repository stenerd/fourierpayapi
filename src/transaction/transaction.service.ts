import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { GenerateRandomString } from 'src/utils/code-generator.util';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ViewTransactionDto } from './dto/view-transaction.dto';
import { Transaction } from './transaction.model';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService extends CoreService<TransactionRepository> {
  constructor(private readonly transactionRepository: TransactionRepository) {
    super(transactionRepository);
  }

  async generateReferenceCode(): Promise<string> {
    const reference = GenerateRandomString(14);
    if (await this.findOne({ reference })) {
      return await this.generateReferenceCode();
    } else {
      return reference;
    }
  }

  async checkReference(reference: string): Promise<Transaction> {
    const check = await this.findOne({ reference });
    if (check)
      throw new BadRequestException(
        'refernece already exist. generate another reference.',
      );
    return check;
  }

  async generateReference() {
    const reference = `T${await this.generateReferenceCode()}`;
    return { reference };
  }

  async getTransaction(user_id: string = null, query: ViewTransactionDto) {
    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        reference: { $regex: query.q, $options: 'i' },
      };
    }
    if (query.status) {
      searchQuery.status = query.status;
    }
    if (query.entity) {
      searchQuery.in_entity = query.entity;
    }
    if (query.type) {
      searchQuery.type = query.type;
    }

    searchQuery = {
      ...searchQuery,
      ...(query.startDate &&
        !query.endDate && {
          createdAt: {
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
      ...(!query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate).toISOString(),
          },
        }),
      ...(query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate).toISOString(),
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
    };

    const total = await this.transactionRepository
      .model()
      .find({
        ...searchQuery,
        ...(user_id ? { reciever_id: user_id } : {}),
      })
      .count();

    const { page, perPage } = query;
    const transaction = await this.transactionRepository
      .model()
      .find({
        ...searchQuery,
        ...(user_id ? { reciever_id: user_id } : {}),
      })
      .populate([
        'reciever_id',
        'in_entity_id',
        'out_entity_id',
        'payment_link_id',
      ])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);

    return {
      data: transaction,
      meta: {
        total,
        page: +page || 1,
        lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
      },
    };
  }
}
