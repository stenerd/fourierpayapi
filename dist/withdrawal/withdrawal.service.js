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
};
WithdrawalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [withdrawal_repository_1.WithdrawalRepository])
], WithdrawalService);
exports.WithdrawalService = WithdrawalService;
//# sourceMappingURL=withdrawal.service.js.map