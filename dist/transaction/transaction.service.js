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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const code_generator_util_1 = require("../utils/code-generator.util");
const transaction_repository_1 = require("./transaction.repository");
const date_formatter_util_1 = require("../utils/date-formatter.util");
const date_fns_1 = require("date-fns");
const transaction_enum_1 = require("./transaction.enum");
let TransactionService = class TransactionService extends service_core_1.CoreService {
    constructor(transactionRepository) {
        super(transactionRepository);
        this.transactionRepository = transactionRepository;
    }
    async generateReferenceCode() {
        const reference = (0, code_generator_util_1.GenerateRandomString)(14);
        if (await this.findOne({ reference })) {
            return await this.generateReferenceCode();
        }
        else {
            return reference;
        }
    }
    async checkReference(reference) {
        const check = await this.findOne({ reference });
        if (check)
            throw new common_1.BadRequestException('refernece already exist. generate another reference.');
        return check;
    }
    async generateReference() {
        const reference = `T${await this.generateReferenceCode()}`;
        return { reference };
    }
    async getTransaction(user_id = null, query) {
        let searchQuery = {};
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
        const total = await this.transactionRepository
            .model()
            .find(Object.assign(Object.assign({}, searchQuery), (user_id ? { reciever_id: user_id } : {})))
            .count();
        const { page, perPage } = query;
        const transaction = await this.transactionRepository
            .model()
            .find(Object.assign(Object.assign({}, searchQuery), (user_id ? { reciever_id: user_id } : {})))
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
    async dashboardTransaction(query) {
        const searchAllQuery = Object.assign(Object.assign(Object.assign({ is_charges: false }, (query.startDate &&
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
        const totalAll = await this.transactionRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        return { totalAll };
    }
    async dashboardCharge(query) {
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
        const totalAll = await this.transactionRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        return { totalAll };
    }
    async adminTransaction(query) {
        let searchQuery = {};
        if (query.q) {
            searchQuery = Object.assign(Object.assign({}, searchQuery), { reference: { $regex: query.q, $options: 'i' } });
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
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({ is_charges: false }, searchQuery), (query.startDate &&
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
        const total = await this.transactionRepository
            .model()
            .find(Object.assign({}, searchQuery))
            .count();
        const { page, perPage } = query;
        const transaction = await this.transactionRepository
            .model()
            .find(Object.assign({}, searchQuery))
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
    async adminCharge(query) {
        let searchQuery = {
            type: transaction_enum_1.TransactionType.CREDIT,
        };
        if (query.q) {
            searchQuery = Object.assign(Object.assign({}, searchQuery), { reference: { $regex: query.q, $options: 'i' } });
        }
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({ is_charges: true }, searchQuery), (query.startDate &&
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
        const total = await this.transactionRepository
            .model()
            .find(Object.assign({}, searchQuery))
            .count();
        const { page, perPage } = query;
        const transaction = await this.transactionRepository
            .model()
            .find(Object.assign({}, searchQuery))
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
    async adminChargeCount(query) {
        let searchQuery = {
            type: transaction_enum_1.TransactionType.CREDIT,
        };
        if (query.q) {
            searchQuery = Object.assign(Object.assign({}, searchQuery), { reference: { $regex: query.q, $options: 'i' } });
        }
        const recentQuery = Object.assign(Object.assign(Object.assign(Object.assign({ is_charges: true }, searchQuery), (query.startDate &&
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
        const transaction = await this.transactionRepository.model().find(Object.assign({}, recentQuery));
        let percentage = 0;
        let paystackPercentage = 0;
        let paystackTotal = 0;
        let adminChargePercentage = 0;
        const recentTotal = transaction.reduce((accumulator, currentValue) => {
            if (currentValue.in_entity === transaction_enum_1.TransactionEntity.WITHDRAWAL) {
                if (+currentValue.amount === 100) {
                    paystackTotal += 50;
                }
                if (+currentValue.amount === 75) {
                    paystackTotal += 25;
                }
                if (+currentValue.amount === 50) {
                    paystackTotal += 10;
                }
            }
            else {
                if (+currentValue.amount > 3000) {
                    const amount = +currentValue.amount * 50 + +currentValue.amount;
                    const paystackCharge = 0.015 * amount;
                    paystackTotal += paystackCharge;
                }
                else {
                    paystackTotal += 2000;
                }
            }
            if (currentValue.status === transaction_enum_1.TransactionStatus.PAID) {
                return accumulator + +currentValue.amount;
            }
            else {
                return accumulator;
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
            const lastTransaction = await this.transactionRepository.model().find(Object.assign({}, lastQueries));
            let lastPaystackTotal = 0;
            const lastTotal = lastTransaction.reduce((accumulator, currentValue) => {
                if (currentValue.in_entity === transaction_enum_1.TransactionEntity.WITHDRAWAL) {
                    if (+currentValue.amount === 100) {
                        lastPaystackTotal += 50;
                    }
                    if (+currentValue.amount === 75) {
                        lastPaystackTotal += 25;
                    }
                    if (+currentValue.amount === 50) {
                        lastPaystackTotal += 10;
                    }
                }
                else {
                    if (+currentValue.amount < 3000) {
                        const amount = +currentValue.amount * 50 + +currentValue.amount;
                        const paystackCharge = 0.015 * amount;
                        lastPaystackTotal += paystackCharge;
                    }
                    else {
                        lastPaystackTotal += 2000;
                    }
                }
                if (currentValue.status === transaction_enum_1.TransactionStatus.PAID) {
                    return accumulator + +currentValue.amount;
                }
                else {
                    return accumulator;
                }
            }, 0);
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
    async adminTransactionsCount(query) {
        let searchQuery = {
            status: transaction_enum_1.TransactionStatus.PAID,
        };
        if (query.q) {
            searchQuery = Object.assign(Object.assign({}, searchQuery), { reference: { $regex: query.q, $options: 'i' } });
        }
        const recentQuery = Object.assign(Object.assign(Object.assign(Object.assign({ is_charges: { $ne: true } }, searchQuery), (query.startDate &&
            !query.endDate && {
            createdAt: {
                $gte: new Date(query.startDate),
            },
        })), (!query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate),
            },
        })), (query.startDate &&
            query.endDate && {
            createdAt: {
                $lte: new Date(query.endDate),
                $gte: new Date(query.startDate),
            },
        }));
        const transaction = await this.transactionRepository.model().aggregate([
            {
                $match: Object.assign({}, recentQuery),
            },
            {
                $group: {
                    _id: null,
                    recentTotal: {
                        $sum: '$amount',
                    },
                    paymentTotal: {
                        $sum: {
                            $cond: [
                                { $eq: ['$in_entity', transaction_enum_1.TransactionEntity.PAYMENT] },
                                '$amount',
                                0,
                            ],
                        },
                    },
                    withdrawalTotal: {
                        $sum: {
                            $cond: [
                                { $eq: ['$out_entity', transaction_enum_1.TransactionEntity.WITHDRAWAL] },
                                '$amount',
                                0,
                            ],
                        },
                    },
                },
            },
        ]);
        let percentage = 0;
        let paymentPercentage = 0;
        const recentTotal = transaction[0] ? transaction[0].recentTotal : 0;
        const paymentTotal = transaction[0] ? transaction[0].paymentTotal : 0;
        const withdrawalTotal = transaction[0] ? transaction[0].withdrawalTotal : 0;
        let withdrawalPercentage = 0;
        const checkLast = query.startDate && query.endDate;
        if (!!checkLast) {
            const getDifferenceInDays = (0, date_formatter_util_1.CheckDateDifference)(query.startDate, query.endDate);
            const lastQueries = Object.assign(Object.assign({ is_charges: { $ne: true } }, searchQuery), (query.startDate &&
                query.endDate && {
                createdAt: {
                    $gte: new Date((0, date_fns_1.format)((0, date_fns_1.subDays)((0, date_fns_1.parseISO)(query.startDate), getDifferenceInDays), 'yyyy-MM-dd')),
                    $lte: new Date(query.startDate),
                },
            }));
            const lastTransaction = await this.transactionRepository
                .model()
                .aggregate([
                {
                    $match: Object.assign({}, lastQueries),
                },
                {
                    $group: {
                        _id: null,
                        recentTotal: {
                            $sum: '$amount',
                        },
                        paymentTotal: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$in_entity', transaction_enum_1.TransactionEntity.PAYMENT] },
                                    '$amount',
                                    0,
                                ],
                            },
                        },
                        withdrawalTotal: {
                            $sum: {
                                $cond: [
                                    { $eq: ['$out_entity', transaction_enum_1.TransactionEntity.WITHDRAWAL] },
                                    '$amount',
                                    0,
                                ],
                            },
                        },
                    },
                },
            ]);
            const lastTotal = lastTransaction[0] ? lastTransaction[0].recentTotal : 0;
            const lastPaymentTotal = lastTransaction[0]
                ? lastTransaction[0].paymentTotal
                : 0;
            const lastWithdrawalTotal = lastTransaction[0]
                ? lastTransaction[0].withdrawalTotal
                : 0;
            percentage = ((recentTotal - lastTotal) / (lastTotal || 1)) * 100;
            paymentPercentage =
                ((paymentTotal - lastPaymentTotal) / (lastPaymentTotal || 1)) * 100;
            withdrawalPercentage =
                ((withdrawalTotal - lastWithdrawalTotal) / (lastWithdrawalTotal || 1)) *
                    100;
        }
        return {
            percentage,
            showPercent: !!checkLast,
            total: recentTotal,
            paymentTotal,
            paymentPercentage,
            withdrawalTotal,
            withdrawalPercentage,
        };
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map