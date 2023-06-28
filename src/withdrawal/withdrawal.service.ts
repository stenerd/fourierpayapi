import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { ViewWithdrawalDto } from './withdrawal.dto';
import { WithdrawalRepository } from './withdrawal.repository';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';

@Injectable()
export class WithdrawalService extends CoreService<WithdrawalRepository> {
  constructor(private readonly withdrawalRepository: WithdrawalRepository) {
    super(withdrawalRepository);
  }

  async fetchProfileWithdrawal(user_id: string) {
    const resp = await this.withdrawalRepository
      .model()
      .find({
        // status: TransactionStatus.PAID,
        ...(user_id ? { user_id } : {}),
      })
      .populate(['transaction_id'])
      .sort({ _id: -1 })
      .limit(4);
    return resp;
  }

  async fetchWithdrawal(user_id: string, query: ViewWithdrawalDto) {
    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        $or: [
          { bank_name: { $regex: query.q, $options: 'i' } },
          { account_number: { $regex: query.q, $options: 'i' } },
          { name: { $regex: query.q, $options: 'i' } },
          { paystack_reference: { $regex: query.q, $options: 'i' } },
        ],
      };
    }
    if (query.status) {
      searchQuery.status = query.status;
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

    console.log('searchQuery >> ', {
      ...searchQuery,
      ...(user_id ? { user_id } : {}),
    });
    const total = await this.withdrawalRepository
      .model()
      .find({
        ...searchQuery,
        ...(user_id ? { user_id } : {}),
      })
      .count();
    const { page, perPage } = query;
    const resp = await this.withdrawalRepository
      .model()
      .find({
        ...searchQuery,
        ...(user_id ? { user_id } : {}),
      })
      .populate(['transaction_id'])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);
    return {
      data: resp,
      meta: {
        total,
        page: +page || 1,
        lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
      },
    };
  }

  async dashboardWithdrawal(query: CoreSearchFilterDatePaginationDto) {
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

    const totalAll = await this.withdrawalRepository
      .model()
      .find({
        ...searchAllQuery,
      })
      .count();

    return { totalAll };
  }

  async adminWithdrawal(query: ViewWithdrawalDto) {
    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        $or: [
          { bank_name: { $regex: query.q, $options: 'i' } },
          { account_number: { $regex: query.q, $options: 'i' } },
          { name: { $regex: query.q, $options: 'i' } },
          { paystack_reference: { $regex: query.q, $options: 'i' } },
        ],
      };
    }
    if (query.status) {
      searchQuery.status = query.status;
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

    console.log('searchQuery >> ', {
      ...searchQuery,
    });
    const total = await this.withdrawalRepository
      .model()
      .find({
        ...searchQuery,
      })
      .count();
    const { page, perPage } = query;
    const resp = await this.withdrawalRepository
      .model()
      .find({
        ...searchQuery,
      })
      .populate(['transaction_id'])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);
    return {
      data: resp,
      meta: {
        total,
        page: +page || 1,
        lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
      },
    };
  }
}
