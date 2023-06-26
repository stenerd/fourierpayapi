import { BadRequestException, Injectable } from '@nestjs/common';
import { LinkUsageEnum } from 'src/link/link.enum';
import { LinkRepository } from 'src/link/link.repository';
import { PaymentLinkRepository } from 'src/payment-link/repositories/payment-link.repository';
import { PaymentRepository } from 'src/payment/payment.repository';
import { TransactionStatus } from 'src/transaction/transaction.enum';
import { TransactionRepository } from 'src/transaction/transaction.repository';
import { WithdrawalRepository } from 'src/withdrawal/withdrawal.repository';
import { ChartTypeEnum } from './dashboard.enum';

@Injectable()
export class DashboardService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentLinkRepository: PaymentLinkRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly withdrawalRepository: WithdrawalRepository,
    private readonly linkRepository: LinkRepository,
  ) {}
  async getDashboardMatrix(user_id: string = null) {
    const payments = await this.paymentRepository.find({
      status: TransactionStatus.PAID,
      ...(user_id ? { reciever_id: user_id } : {}),
    });
    const income = payments.reduce(
      (acc, currentValue) => acc + currentValue.amount,
      0,
    );
    const paymentCount = await this.paymentRepository.model().count({
      status: TransactionStatus.PAID,
      ...(user_id ? { reciever_id: user_id } : {}),
    });
    const paymentLinkCount = await this.paymentLinkRepository.model().count({
      ...(user_id ? { creator_id: user_id } : {}),
    });

    const withdrawals = await this.withdrawalRepository.find({
      status: TransactionStatus.PAID,
      ...(user_id ? { user_id } : {}),
    });

    const withdrawal = withdrawals.reduce(
      (acc, currentValue) => acc + currentValue.amount,
      0,
    );

    const availableLinksCount = await this.linkRepository.model().count({
      ...(user_id ? { user_id } : {}),
      usage: LinkUsageEnum.AVAILABLE,
    });

    const usedLinksCount = await this.linkRepository.model().count({
      ...(user_id ? { user_id } : {}),
      usage: LinkUsageEnum.USED,
    });

    return {
      paymentCount,
      paymentLinkCount,
      income,
      withdrawal,
      availableLinksCount,
      usedLinksCount,
    };
  }

  async getDashboardTables(user_id: string = null) {
    console.log(' user_id >> ', user_id);
    const recentPayments = await this.paymentRepository
      .model()
      .find({
        // status: TransactionStatus.PAID,
        ...(user_id ? { reciever_id: user_id } : {}),
      })
      .populate(['transaction_id', 'payment_link_id'])
      .sort({ _id: -1 })
      .limit(3);
    const recentPaymentLinks = await this.paymentLinkRepository
      .model()
      .find({
        ...(user_id ? { creator_id: user_id } : {}),
      })
      .sort({ _id: -1 })
      .limit(7);

    return {
      recentPayments,
      recentPaymentLinks,
    };
  }

  async getProfileTables(user_id: string = null) {
    const recentTransaction = await this.transactionRepository
      .model()
      .find({
        ...(user_id ? { reciever_id: user_id } : {}),
      })
      .populate([
        'reciever_id',
        'in_entity_id',
        'out_entity_id',
        'payment_link_id',
      ])
      .sort({ _id: -1 })
      .limit(4);

    return {
      recentTransaction,
      recentWithdrawals: [],
    };
  }

  getSundayFromWeekNum(weekNum: number, year: number) {
    const sunday = new Date(year, 0, 1 + (weekNum - 1) * 7);
    while (sunday.getDay() !== 0) {
      sunday.setDate(sunday.getDate() - 1);
    }
    return sunday;
  }

  getFirstAndlastDayOfTheMonth(year: number, month: number) {
    const date = new Date(`${year}/${month < 10 ? '0' + month : month}/01`);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(firstDay, lastDay);
    return [firstDay, lastDay];
  }

  getFirstAndlastDayOfTheYear(year: number) {
    const date = new Date(`${year}/01/01`);
    const ldate = new Date(`${year + 1}/01/01`);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(ldate.getFullYear(), ldate.getMonth(), 1);
    console.log(firstDay, lastDay);
    return [firstDay, lastDay];
  }

  async chartAnalysis(
    startDate,
    endDate,
    user_id,
  ): Promise<Record<string, any>> {
    const searchQuery = {
      ...(startDate &&
        !endDate && {
          createdAt: {
            $gt: new Date(startDate).toISOString(),
          },
        }),
      ...(!startDate &&
        endDate && {
          createdAt: {
            $lte: new Date(endDate).toISOString(),
          },
        }),
      ...(startDate &&
        endDate && {
          createdAt: {
            $lte: new Date(endDate).toISOString(),
            $gt: new Date(startDate).toISOString(),
          },
        }),
    };

    const payment = await this.paymentRepository.model().find({
      ...searchQuery,
      reciever_id: user_id,
      status: TransactionStatus.PAID,
    });

    const withdrawal = await this.withdrawalRepository.model().find({
      ...searchQuery,
      user_id,
      status: TransactionStatus.PAID,
    });

    const dateMap = {};

    for (
      let d = new Date(startDate);
      d <= new Date(endDate);
      d.setDate(d.getDate() + 1)
    ) {
      const date = new Date(d).toDateString();
      const dateArr = date.split(' ');
      dateArr.pop();
      const newDate = dateArr.join(' ');
      dateMap[newDate] = {
        payment: 0,
        withdrawal: 0,
      };
    }

    for (let i = 0; i < payment.length; i++) {
      const eachPayment = payment[i] as Record<string, any>;

      const date = new Date(eachPayment.createdAt).toDateString();
      const dateArr = date.split(' ');
      dateArr.pop();
      const newDate = dateArr.join(' ');
      dateMap[newDate].payment += eachPayment.amount;
    }

    for (let i = 0; i < withdrawal.length; i++) {
      const eachWithdrawal = withdrawal[i] as Record<string, any>;

      const date = new Date(eachWithdrawal.createdAt).toDateString();
      const dateArr = date.split(' ');
      dateArr.pop();
      const newDate = dateArr.join(' ');
      dateMap[newDate].withdrawal += eachWithdrawal.amount;
    }

    // console.log('dateMap >> ', dateMap);

    const result = [];
    for (const key in dateMap) {
      if (Object.prototype.hasOwnProperty.call(dateMap, key)) {
        const element = dateMap[key];
        result.push({
          day: key,
          incoming: element.payment,
          outgoing: element.withdrawal,
        });
      }
    }

    return result;
  }

  async getChartData(
    type: ChartTypeEnum,
    year: string,
    param: string | number = null,
    user_id: string = null,
  ) {
    if (type === ChartTypeEnum.WEEK) {
      const startDate = this.getSundayFromWeekNum(+param, +year);
      const endDate = this.getSundayFromWeekNum(+param + 1, +year);

      console.log(startDate, endDate);

      return await this.chartAnalysis(startDate, endDate, user_id);
    }
    if (type === ChartTypeEnum.MONTH) {
      const monthArr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      if (monthArr.indexOf(param as string) < 0)
        throw new BadRequestException('invalid selected month');
      const [startDate, endDate] = this.getFirstAndlastDayOfTheMonth(
        +year,
        monthArr.indexOf(param as string) + 1,
      );

      // console.log(startDate, endDate);

      return await this.chartAnalysis(startDate, endDate, user_id);
    }
    if (type === ChartTypeEnum.YEAR) {
      const [startDate, endDate] = this.getFirstAndlastDayOfTheYear(+year);

      console.log(startDate, endDate);

      const searchQuery = {
        ...(startDate &&
          !endDate && {
            createdAt: {
              $gt: new Date(startDate).toISOString(),
            },
          }),
        ...(!startDate &&
          endDate && {
            createdAt: {
              $lte: new Date(endDate).toISOString(),
            },
          }),
        ...(startDate &&
          endDate && {
            createdAt: {
              $lte: new Date(endDate).toISOString(),
              $gt: new Date(startDate).toISOString(),
            },
          }),
      };

      const payment = await this.paymentRepository.model().find({
        ...searchQuery,
        reciever_id: user_id,
        status: TransactionStatus.PAID,
      });

      const withdrawal = await this.withdrawalRepository.model().find({
        ...searchQuery,
        user_id,
        status: TransactionStatus.PAID,
      });

      const dateMap = {};

      for (
        let d = new Date(startDate);
        d <= new Date(endDate);
        d.setMonth(d.getMonth() + 1)
      ) {
        const date = new Date(d).toDateString();
        const dateArr = date.split(' ');
        const newDate = dateArr[1];
        dateMap[newDate] = {
          payment: 0,
          withdrawal: 0,
        };
      }

      for (let i = 0; i < payment.length; i++) {
        const eachPayment = payment[i] as Record<string, any>;

        const date = new Date(eachPayment.createdAt).toDateString();
        const dateArr = date.split(' ');
        const newDate = dateArr[1];
        dateMap[newDate].payment += eachPayment.amount;
      }

      for (let i = 0; i < withdrawal.length; i++) {
        const eachWithdrawal = withdrawal[i] as Record<string, any>;

        const date = new Date(eachWithdrawal.createdAt).toDateString();
        const dateArr = date.split(' ');
        const newDate = dateArr[1];
        dateMap[newDate].withdrawal += eachWithdrawal.amount;
      }

      const result = [];
      for (const key in dateMap) {
        if (Object.prototype.hasOwnProperty.call(dateMap, key)) {
          const element = dateMap[key];
          result.push({
            day: key,
            incoming: element.payment,
            outgoing: element.withdrawal,
          });
        }
      }

      return result;

      // return await this.chartAnalysis(startDate, endDate, user_id);
    }
  }
}
