import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { ViewWithdrawalDto } from './withdrawal.dto';
import { WithdrawalRepository } from './withdrawal.repository';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { Withdrawal } from './withdrawal.model';
import { Transaction } from 'src/transaction/transaction.model';
import { TransactionStatus } from 'src/transaction/transaction.enum';
import { addDays, format, parseISO, subDays } from 'date-fns';
import { CheckDateDifference } from 'src/utils/date-formatter.util';

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

  async adminWithdrawalCount(query: ViewWithdrawalDto) {
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
    const recentSearchQuery = {
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

    const total = await this.withdrawalRepository
      .model()
      .find({
        ...recentSearchQuery,
      })
      .count();
    const { page, perPage } = query;
    const withdrawals = await this.withdrawalRepository
      .model()
      .find({
        ...recentSearchQuery,
      })
      .populate(['transaction_id'])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);

    let percentage = 0;
    let pendingPercentage = 0;
    let totalRecentPendingAmount = 0;
    const totalRecentAmount = withdrawals.reduce(
      (accumulator: number, currentValue: Withdrawal) => {
        if (currentValue.status === TransactionStatus.PENDING) {
          totalRecentPendingAmount += +currentValue.amount;
          return accumulator;
        } else {
          if (currentValue.status === TransactionStatus.PAID) {
            return accumulator + +currentValue.amount;
          } else {
            return accumulator;
          }
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

      const lastWithdrawals = await this.withdrawalRepository.model().find({
        ...lastQueries,
      });

      let totallastPendingAmount = 0;
      const totallastAmount = lastWithdrawals.reduce(
        (accumulator: number, currentValue: Withdrawal) => {
          if (currentValue.status === TransactionStatus.PENDING) {
            totallastPendingAmount += +currentValue.amount;
            return accumulator;
          } else {
            if (currentValue.status === TransactionStatus.PAID) {
              return accumulator + +currentValue.amount;
            } else {
              return accumulator;
            }
          }
        },
        0,
      );

      percentage =
        ((totalRecentAmount - totallastAmount) / (totallastAmount || 1)) * 100;
      pendingPercentage =
        ((totalRecentPendingAmount - totallastPendingAmount) /
          (totallastPendingAmount || 1)) *
        100;
    }

    return {
      percentage,
      pendingPercentage,
      showPercent: !!checkLast,
      totalRecentPendingAmount,
      totalRecentAmount,
    };
  }
}
