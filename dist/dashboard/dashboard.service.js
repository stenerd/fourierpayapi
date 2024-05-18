"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const link_enum_1 = require("../link/link.enum");
const link_repository_1 = require("../link/link.repository");
const payment_link_repository_1 = require("../payment-link/repositories/payment-link.repository");
const payment_repository_1 = require("../payment/payment.repository");
const transaction_enum_1 = require("../transaction/transaction.enum");
const transaction_repository_1 = require("../transaction/transaction.repository");
const withdrawal_repository_1 = require("../withdrawal/withdrawal.repository");
const dashboard_enum_1 = require("./dashboard.enum");
let DashboardService = class DashboardService {
    constructor(paymentRepository, paymentLinkRepository, transactionRepository, withdrawalRepository, linkRepository) {
        this.paymentRepository = paymentRepository;
        this.paymentLinkRepository = paymentLinkRepository;
        this.transactionRepository = transactionRepository;
        this.withdrawalRepository = withdrawalRepository;
        this.linkRepository = linkRepository;
    }
    async getDashboardMatrix(user_id = null) {
        const payments = await this.paymentRepository.find(Object.assign({ status: transaction_enum_1.TransactionStatus.PAID }, (user_id ? { reciever_id: user_id } : {})));
        const income = payments.reduce((acc, currentValue) => acc + currentValue.amount, 0);
        const paymentCount = await this.paymentRepository.model().count(Object.assign({ status: transaction_enum_1.TransactionStatus.PAID }, (user_id ? { reciever_id: user_id } : {})));
        const paymentLinkCount = await this.paymentLinkRepository.model().count(Object.assign({}, (user_id ? { creator_id: user_id } : {})));
        const withdrawals = await this.withdrawalRepository.find(Object.assign({ status: transaction_enum_1.TransactionStatus.PAID }, (user_id ? { user_id } : {})));
        const withdrawal = withdrawals.reduce((acc, currentValue) => acc + currentValue.amount, 0);
        const availableLinksCount = await this.linkRepository.model().count(Object.assign(Object.assign({}, (user_id ? { user_id } : {})), { usage: link_enum_1.LinkUsageEnum.AVAILABLE }));
        const usedLinksCount = await this.linkRepository.model().count(Object.assign(Object.assign({}, (user_id ? { user_id } : {})), { usage: link_enum_1.LinkUsageEnum.USED }));
        return {
            paymentCount,
            paymentLinkCount,
            income,
            withdrawal,
            availableLinksCount,
            usedLinksCount,
        };
    }
    async getDashboardTables(user_id = null) {
        console.log(' user_id >> ', user_id);
        const recentPayments = await this.paymentRepository
            .model()
            .find(Object.assign({ status: transaction_enum_1.TransactionStatus.PAID }, (user_id ? { reciever_id: user_id } : {})))
            .populate(['transaction_id', 'payment_link_id'])
            .sort({ _id: -1 })
            .limit(3);
        const recentPaymentLinks = await this.paymentLinkRepository
            .model()
            .find(Object.assign({}, (user_id ? { creator_id: user_id } : {})))
            .sort({ _id: -1 })
            .limit(7);
        return {
            recentPayments,
            recentPaymentLinks,
        };
    }
    async getProfileTables(user_id = null) {
        const recentTransaction = await this.transactionRepository
            .model()
            .find(Object.assign({}, (user_id
            ? { reciever_id: user_id, status: transaction_enum_1.TransactionStatus.PAID }
            : {})))
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
    getSundayFromWeekNum(weekNum, year) {
        const sunday = new Date(year, 0, 1 + (weekNum - 1) * 7);
        while (sunday.getDay() !== 0) {
            sunday.setDate(sunday.getDate() - 1);
        }
        return sunday;
    }
    getFirstAndlastDayOfTheMonth(year, month) {
        const date = new Date(`${year}/${month < 10 ? '0' + month : month}/01`);
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        console.log(firstDay, lastDay);
        return [firstDay, lastDay];
    }
    getFirstAndlastDayOfTheYear(year) {
        const date = new Date(`${year}/01/01`);
        const ldate = new Date(`${year + 1}/01/01`);
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(ldate.getFullYear(), ldate.getMonth(), 1);
        console.log(firstDay, lastDay);
        return [firstDay, lastDay];
    }
    async chartAnalysis(startDate, endDate, user_id) {
        const searchQuery = Object.assign(Object.assign(Object.assign({}, (startDate &&
            !endDate && {
            createdAt: {
                $gt: new Date(startDate).toISOString(),
            },
        })), (!startDate &&
            endDate && {
            createdAt: {
                $lte: new Date(endDate).toISOString(),
            },
        })), (startDate &&
            endDate && {
            createdAt: {
                $lte: new Date(endDate).toISOString(),
                $gt: new Date(startDate).toISOString(),
            },
        }));
        const payment = await this.paymentRepository.model().find(Object.assign(Object.assign({}, searchQuery), { reciever_id: user_id, status: transaction_enum_1.TransactionStatus.PAID }));
        const withdrawal = await this.withdrawalRepository.model().find(Object.assign(Object.assign({}, searchQuery), { user_id, status: transaction_enum_1.TransactionStatus.PAID }));
        const dateMap = {};
        for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
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
            const eachPayment = payment[i];
            const date = new Date(eachPayment.createdAt).toDateString();
            const dateArr = date.split(' ');
            dateArr.pop();
            const newDate = dateArr.join(' ');
            dateMap[newDate].payment += eachPayment.amount;
        }
        for (let i = 0; i < withdrawal.length; i++) {
            const eachWithdrawal = withdrawal[i];
            const date = new Date(eachWithdrawal.createdAt).toDateString();
            const dateArr = date.split(' ');
            dateArr.pop();
            const newDate = dateArr.join(' ');
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
    }
    async getChartData(type, year, param = null, user_id = null) {
        if (type === dashboard_enum_1.ChartTypeEnum.WEEK) {
            const startDate = this.getSundayFromWeekNum(+param, +year);
            const endDate = this.getSundayFromWeekNum(+param + 1, +year);
            console.log(startDate, endDate);
            return await this.chartAnalysis(startDate, endDate, user_id);
        }
        if (type === dashboard_enum_1.ChartTypeEnum.MONTH) {
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
            if (monthArr.indexOf(param) < 0)
                throw new common_1.BadRequestException('invalid selected month');
            const [startDate, endDate] = this.getFirstAndlastDayOfTheMonth(+year, monthArr.indexOf(param) + 1);
            return await this.chartAnalysis(startDate, endDate, user_id);
        }
        if (type === dashboard_enum_1.ChartTypeEnum.YEAR) {
            const [startDate, endDate] = this.getFirstAndlastDayOfTheYear(+year);
            console.log(startDate, endDate);
            const searchQuery = Object.assign(Object.assign(Object.assign({}, (startDate &&
                !endDate && {
                createdAt: {
                    $gt: new Date(startDate).toISOString(),
                },
            })), (!startDate &&
                endDate && {
                createdAt: {
                    $lte: new Date(endDate).toISOString(),
                },
            })), (startDate &&
                endDate && {
                createdAt: {
                    $lte: new Date(endDate).toISOString(),
                    $gt: new Date(startDate).toISOString(),
                },
            }));
            const payment = await this.paymentRepository.model().find(Object.assign(Object.assign({}, searchQuery), { reciever_id: user_id, status: transaction_enum_1.TransactionStatus.PAID }));
            const withdrawal = await this.withdrawalRepository.model().find(Object.assign(Object.assign({}, searchQuery), { user_id, status: transaction_enum_1.TransactionStatus.PAID }));
            const dateMap = {};
            for (let d = new Date(startDate); d <= new Date(endDate); d.setMonth(d.getMonth() + 1)) {
                const date = new Date(d).toDateString();
                const dateArr = date.split(' ');
                const newDate = dateArr[1];
                dateMap[newDate] = {
                    payment: 0,
                    withdrawal: 0,
                };
            }
            for (let i = 0; i < payment.length; i++) {
                const eachPayment = payment[i];
                const date = new Date(eachPayment.createdAt).toDateString();
                const dateArr = date.split(' ');
                const newDate = dateArr[1];
                dateMap[newDate].payment += eachPayment.amount;
            }
            for (let i = 0; i < withdrawal.length; i++) {
                const eachWithdrawal = withdrawal[i];
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
        }
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_repository_1.PaymentRepository,
        payment_link_repository_1.PaymentLinkRepository,
        transaction_repository_1.TransactionRepository,
        withdrawal_repository_1.WithdrawalRepository,
        link_repository_1.LinkRepository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map