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
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map