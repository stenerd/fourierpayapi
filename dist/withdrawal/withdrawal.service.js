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
exports.WithdrawalService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const withdrawal_repository_1 = require("./withdrawal.repository");
const transaction_enum_1 = require("../transaction/transaction.enum");
const date_fns_1 = require("date-fns");
const date_formatter_util_1 = require("../utils/date-formatter.util");
let WithdrawalService = class WithdrawalService extends service_core_1.CoreService {
    constructor(withdrawalRepository) {
        super(withdrawalRepository);
        this.withdrawalRepository = withdrawalRepository;
    }
    async fetchProfileWithdrawal(user_id) {
        const resp = await this.withdrawalRepository
            .model()
            .find(Object.assign({}, (user_id ? { user_id } : {})))
            .populate(['transaction_id'])
            .sort({ _id: -1 })
            .limit(4);
        return resp;
    }
    async fetchWithdrawal(user_id, query) {
        let searchQuery = {};
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
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate).toISOString(),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
                $gte: new Date(query.startDate).toISOString(),
            },
        }));
        console.log('searchQuery >> ', Object.assign(Object.assign({}, searchQuery), (user_id ? { user_id } : {})));
        const total = await this.withdrawalRepository
            .model()
            .find(Object.assign(Object.assign({}, searchQuery), (user_id ? { user_id } : {})))
            .count();
        const { page, perPage } = query;
        const resp = await this.withdrawalRepository
            .model()
            .find(Object.assign(Object.assign({}, searchQuery), (user_id ? { user_id } : {})))
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
    async dashboardWithdrawal(query) {
        const searchAllQuery = Object.assign(Object.assign(Object.assign({ is_charges: true }, (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate).toISOString(),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
                $gte: new Date(query.startDate).toISOString(),
            },
        }));
        const totalAll = await this.withdrawalRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        return { totalAll };
    }
    async adminWithdrawal(query) {
        let searchQuery = {};
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
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate).toISOString(),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
                $gte: new Date(query.startDate).toISOString(),
            },
        }));
        console.log('searchQuery >> ', Object.assign({}, searchQuery));
        const total = await this.withdrawalRepository
            .model()
            .find(Object.assign({}, searchQuery))
            .count();
        const { page, perPage } = query;
        const resp = await this.withdrawalRepository
            .model()
            .find(Object.assign({}, searchQuery))
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
    async adminWithdrawalCount(query) {
        let searchQuery = {};
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
        const recentSearchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate).toISOString(),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate).toISOString(),
                $gte: new Date(query.startDate).toISOString(),
            },
        }));
        const total = await this.withdrawalRepository
            .model()
            .find(Object.assign({}, recentSearchQuery))
            .count();
        const { page, perPage } = query;
        const withdrawals = await this.withdrawalRepository
            .model()
            .find(Object.assign({}, recentSearchQuery))
            .populate(['transaction_id'])
            .sort({ _id: -1 })
            .skip(((+page || 1) - 1) * (+perPage || 10))
            .limit(+perPage || 10);
        let percentage = 0;
        let pendingPercentage = 0;
        let totalRecentPendingAmount = 0;
        const totalRecentAmount = withdrawals.reduce((accumulator, currentValue) => {
            if (currentValue.status === transaction_enum_1.TransactionStatus.PENDING) {
                totalRecentPendingAmount += +currentValue.amount;
                return accumulator;
            }
            else {
                if (currentValue.status === transaction_enum_1.TransactionStatus.PAID) {
                    return accumulator + +currentValue.amount;
                }
                else {
                    return accumulator;
                }
            }
        }, 0);
        const checkLast = query.startDate && query.endDate;
        if (!!checkLast) {
            const getDifferenceInDays = (0, date_formatter_util_1.CheckDateDifference)(query.startDate, query.endDate);
            const lastQueries = Object.assign(Object.assign({ is_charges: true }, searchQuery), (query.startDate &&
                query.endDate && {
                createdAt: {
                    $gte: new Date((0, date_fns_1.format)((0, date_fns_1.subDays)((0, date_fns_1.parseISO)(query.startDate), getDifferenceInDays), 'yyyy-MM-dd')).toISOString(),
                    $lte: new Date(query.startDate).toISOString(),
                },
            }));
            const lastWithdrawals = await this.withdrawalRepository.model().find(Object.assign({}, lastQueries));
            let totallastPendingAmount = 0;
            const totallastAmount = lastWithdrawals.reduce((accumulator, currentValue) => {
                if (currentValue.status === transaction_enum_1.TransactionStatus.PENDING) {
                    totallastPendingAmount += +currentValue.amount;
                    return accumulator;
                }
                else {
                    if (currentValue.status === transaction_enum_1.TransactionStatus.PAID) {
                        return accumulator + +currentValue.amount;
                    }
                    else {
                        return accumulator;
                    }
                }
            }, 0);
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
};
WithdrawalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [withdrawal_repository_1.WithdrawalRepository])
], WithdrawalService);
exports.WithdrawalService = WithdrawalService;
//# sourceMappingURL=withdrawal.service.js.map