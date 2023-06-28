import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { GenerateRandomString } from 'src/utils/code-generator.util';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ViewTransactionDto } from './dto/view-transaction.dto';
import { Transaction } from './transaction.model';
import { TransactionRepository } from './transaction.repository';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { CheckDateDifference } from 'src/utils/date-formatter.util';
import { addDays, format, parseISO, subDays } from 'date-fns';
import {
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from './transaction.enum';

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

  async dashboardTransaction(query: CoreSearchFilterDatePaginationDto) {
    const searchAllQuery = {
      is_charges: false,
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

    const totalAll = await this.transactionRepository
      .model()
      .find({
        ...searchAllQuery,
      })
      .count();

    return { totalAll };
  }

  async dashboardCharge(query: CoreSearchFilterDatePaginationDto) {
    const searchAllQuery = {
      is_charges: true,
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

    const totalAll = await this.transactionRepository
      .model()
      .find({
        ...searchAllQuery,
      })
      .count();

    return { totalAll };
  }

  async adminTransaction(query: ViewTransactionDto) {
    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        ...searchQuery,
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
      is_charges: false,
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
      })
      .count();

    const { page, perPage } = query;
    const transaction = await this.transactionRepository
      .model()
      .find({
        ...searchQuery,
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

  async adminCharge(query: ViewTransactionDto) {
    let searchQuery: Record<string, any> = {
      type: TransactionType.CREDIT,
    };
    if (query.q) {
      searchQuery = {
        ...searchQuery,
        reference: { $regex: query.q, $options: 'i' },
      };
    }

    searchQuery = {
      is_charges: true,
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
      })
      .count();

    const { page, perPage } = query;
    const transaction = await this.transactionRepository
      .model()
      .find({
        ...searchQuery,
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

  async adminChargeCount(query: ViewTransactionDto) {
    let searchQuery: Record<string, any> = {
      type: TransactionType.CREDIT,
    };
    if (query.q) {
      searchQuery = {
        ...searchQuery,
        reference: { $regex: query.q, $options: 'i' },
      };
    }

    const recentQuery = {
      is_charges: true,
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

    const transaction = await this.transactionRepository.model().find({
      ...recentQuery,
    });

    let percentage = 0;
    let paystackPercentage = 0;
    let paystackTotal = 0;
    let adminChargePercentage = 0;
    const recentTotal = transaction.reduce(
      (accumulator: number, currentValue: Transaction) => {
        if (currentValue.in_entity === TransactionEntity.WITHDRAWAL) {
          if (+currentValue.amount === 100) {
            paystackTotal += 50;
          }
          if (+currentValue.amount === 75) {
            paystackTotal += 25;
          }
          if (+currentValue.amount === 50) {
            paystackTotal += 10;
          }
        } else {
          if (+currentValue.amount > 3000) {
            const amount = +currentValue.amount * 50 + +currentValue.amount;
            const paystackCharge = 0.015 * amount;
            paystackTotal += paystackCharge;
          } else {
            paystackTotal += 2000;
          }
        }
        if (currentValue.status === TransactionStatus.PAID) {
          return accumulator + +currentValue.amount;
        } else {
          return accumulator;
        }
      },
      0,
    );

    const checkLast = query.startDate && query.endDate;

    if (!!checkLast) {
      const getDifferenceInDays = CheckDateDifference(
        query.startDate,
        query.endDate,
      );

      const lastQueries = {
        is_charges: true,
        ...searchQuery,
        ...(query.startDate &&
          query.endDate && {
            createdAt: {
              $gte: new Date(
                format(
                  subDays(parseISO(query.startDate), getDifferenceInDays),
                  'yyyy-MM-dd',
                ),
              ).toISOString(),
              $lte: new Date(query.startDate).toISOString(),
            },
          }),
      };

      const lastTransaction = await this.transactionRepository.model().find({
        ...lastQueries,
      });

      let lastPaystackTotal = 0;
      const lastTotal = lastTransaction.reduce(
        (accumulator: number, currentValue: Transaction) => {
          if (currentValue.in_entity === TransactionEntity.WITHDRAWAL) {
            if (+currentValue.amount === 100) {
              lastPaystackTotal += 50;
            }
            if (+currentValue.amount === 75) {
              lastPaystackTotal += 25;
            }
            if (+currentValue.amount === 50) {
              lastPaystackTotal += 10;
            }
          } else {
            if (+currentValue.amount < 3000) {
              const amount = +currentValue.amount * 50 + +currentValue.amount;
              const paystackCharge = 0.015 * amount;
              lastPaystackTotal += paystackCharge;
            } else {
              lastPaystackTotal += 2000;
            }
          }
          if (currentValue.status === TransactionStatus.PAID) {
            return accumulator + +currentValue.amount;
          } else {
            return accumulator;
          }
        },
        0,
      );

      percentage = ((recentTotal - lastTotal) / (lastTotal || 1)) * 100;
      paystackPercentage =
        ((paystackTotal - lastPaystackTotal) / (lastPaystackTotal || 1)) * 100;

      const recentAdminCharge = recentTotal - paystackTotal;
      const lastAdminCharge = lastTotal - lastPaystackTotal;

      adminChargePercentage =
        ((recentAdminCharge - lastAdminCharge) / (lastAdminCharge || 1)) * 100;
    }

    return {
      percentage,
      showPercent: !!checkLast,
      total: recentTotal,
      paystackTotal,
      paystackPercentage,
      adminCharge: recentTotal - paystackTotal,
      adminChargePercentage,
    };
  }
}
