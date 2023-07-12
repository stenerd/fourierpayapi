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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const wallet_service_1 = require("../wallet/wallet.service");
const user_enum_1 = require("./user.enum");
const user_factory_1 = require("./user.factory");
const user_repository_1 = require("./user.repository");
const mailer_1 = require("@nestjs-modules/mailer");
const email_service_1 = require("../email.service");
const code_generator_util_1 = require("../utils/code-generator.util");
const subscription_service_1 = require("../subscription/services/subscription.service");
const subscription_setting_service_1 = require("../subscription/services/subscription-setting.service");
const subscription_enum_1 = require("../subscription/subscription.enum");
const transaction_enum_1 = require("../transaction/transaction.enum");
const date_formatter_util_1 = require("../utils/date-formatter.util");
const signup_1 = require("../email-html/signup");
const date_fns_1 = require("date-fns");
let UserService = class UserService extends service_core_1.CoreService {
    constructor(userRepository, userFactory, walletService, subscriptionService, subscriptionSettingService, mailerService, emailService) {
        super(userRepository);
        this.userRepository = userRepository;
        this.userFactory = userFactory;
        this.walletService = walletService;
        this.subscriptionService = subscriptionService;
        this.subscriptionSettingService = subscriptionSettingService;
        this.mailerService = mailerService;
        this.emailService = emailService;
    }
    async createSuperAcount(data) {
        if (await this.userRepository.findOne({ email: data.email }))
            throw new common_1.ConflictException('Email already exist');
        const userAttribute = this.userFactory.createNew(data);
        userAttribute.role = user_enum_1.RoleEnum.SUPERADMIN;
        userAttribute.isActive = true;
        delete userAttribute.token;
        const user = await this.userRepository.create(userAttribute);
        await this.walletService.create({
            user_id: user._id,
            amount: 0,
        });
    }
    async create(data) {
        if (await this.userRepository.findOne({ email: data.email }))
            throw new common_1.ConflictException('Email already exist');
        const userAttribute = this.userFactory.createNew(data);
        const user = await this.userRepository.create(userAttribute);
        await this.walletService.create({
            user_id: user._id,
            amount: 0,
        });
        const subscription_setting = await this.subscriptionSettingService.fetchOneSubscriptionSetting({
            tag: subscription_enum_1.SubscriptionTagEnum.BASIC,
            active: true,
        });
        await this.subscriptionService.createSubscription(user._id, subscription_setting._id);
        const emailData = {
            name: `${user.firstname} ${user.lastname}`,
            link: `https://fourierpay.com/login?token=${user.token}`,
        };
        this.emailService.sendBrevoMailAPI('welcome', emailData, (0, signup_1.signUpHTML)(emailData), [
            {
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
            },
        ], 'Verify Your Email and Unlock the Power of Fourierpay!');
        return user;
    }
    async updateUser(data, user_id) {
        await this.updateOne(user_id, data);
    }
    async profile(user_id) {
        return await this.findOne({ _id: user_id });
    }
    async confirmEmail(token) {
        const get_user = await this.findOne({ token });
        if (!get_user)
            throw new common_1.BadRequestException('invalid request');
        return await this.updateOne(get_user._id, {
            token: null,
            isActive: true,
        });
    }
    async resetPassword(token, dto) {
        const get_user = await this.findOne({ token });
        if (!get_user)
            throw new common_1.BadRequestException('invalid request');
        get_user.token = null;
        get_user.password = dto.password;
        return await this.userRepository.save(get_user);
    }
    async updateToken(query) {
        const get_user = await this.findOne(Object.assign({}, query));
        if (!get_user)
            throw new common_1.BadRequestException('user does not exist');
        get_user.token = (0, code_generator_util_1.GenerateRandomString)(30);
        return await this.userRepository.save(get_user);
    }
    async allUsers(query) {
        let searchQuery = {};
        if (query.q) {
            searchQuery = {
                email: { $regex: query.q, $options: 'i' },
            };
        }
        if (query.isActive) {
            searchQuery.isActive = query.isActive === user_enum_1.UserStatusEnum.ACTIVE;
        }
        searchQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
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
        const total = await this.userRepository
            .model()
            .find(Object.assign({}, searchQuery))
            .count();
        const { page, perPage } = query;
        const users = await this.userRepository.model().aggregate([
            {
                $match: Object.assign({}, searchQuery),
            },
            {
                $lookup: {
                    from: 'wallets',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'wallets',
                },
            },
            {
                $lookup: {
                    from: 'paymentlinks',
                    localField: '_id',
                    foreignField: 'creator_id',
                    as: 'paymentlinks',
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    let: { user_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$reciever_id', '$$user_id'],
                                },
                            },
                        },
                        {
                            $match: {
                                status: transaction_enum_1.TransactionStatus.PAID,
                            },
                        },
                    ],
                    as: 'transactions',
                },
            },
            {
                $lookup: {
                    from: 'withdrawals',
                    let: { user_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$user_id', '$$user_id'],
                                },
                            },
                        },
                        {
                            $match: {
                                status: transaction_enum_1.TransactionStatus.PAID,
                            },
                        },
                    ],
                    as: 'withdrawals',
                },
            },
            {
                $addFields: {
                    transactionCount: { $size: '$transactions' },
                    paymentLinksCount: { $size: '$paymentlinks' },
                    totalTransaction: { $sum: '$transactions.amount' },
                    walletBalance: { $sum: '$wallets.amount' },
                    totalWithdrawal: { $sum: '$withdrawals.amount' },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    email: 1,
                    role: 1,
                    isActive: 1,
                    paymentLinksCount: 1,
                    transactionCount: 1,
                    walletBalance: 1,
                    totalTransaction: 1,
                    totalWithdrawal: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $skip: ((+page || 1) - 1) * (+perPage || 10),
            },
            {
                $limit: +perPage || 10,
            },
        ]);
        return {
            data: users,
            meta: {
                total,
                page: +page || 1,
                lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
            },
        };
    }
    async allCountUsers() {
        const totalActive = await this.userRepository
            .model()
            .find({
            isActive: true,
        })
            .count();
        const totalInActive = await this.userRepository
            .model()
            .find({
            isActive: false,
        })
            .count();
        return {
            data: {
                active: totalActive,
                inactive: totalInActive,
            },
        };
    }
    async countUsers(query) {
        let searchQuery = {};
        if (query.q) {
            searchQuery = {
                email: { $regex: query.q, $options: 'i' },
            };
        }
        const searchActiveQuery = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), { isActive: true }), (query.startDate &&
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
        const searchInActiveQuery = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), { isActive: false }), (query.startDate &&
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
        const searchAllQuery = Object.assign(Object.assign(Object.assign(Object.assign({}, searchQuery), (query.startDate &&
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
        const totalActive = await this.userRepository
            .model()
            .find(Object.assign({}, searchActiveQuery))
            .count();
        const totalInActive = await this.userRepository
            .model()
            .find(Object.assign({}, searchInActiveQuery))
            .count();
        const totalAll = await this.userRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        let activePercentage = 0;
        let allPercentage = 0;
        let inActivePercentage = 0;
        const checkLast = query.startDate && query.endDate;
        if (!!checkLast) {
            const getDifferenceInDays = (0, date_formatter_util_1.CheckDateDifference)(query.startDate, query.endDate);
            const lastSearchQueries = Object.assign(Object.assign({}, searchQuery), (query.startDate &&
                query.endDate && {
                createdAt: {
                    $gte: new Date((0, date_fns_1.format)((0, date_fns_1.subDays)((0, date_fns_1.parseISO)(query.startDate), getDifferenceInDays), 'yyyy-MM-dd')).toISOString(),
                    $lte: new Date(query.startDate).toISOString(),
                },
            }));
            const lastSearchActiveQuery = Object.assign(Object.assign({}, lastSearchQueries), { isActive: true });
            const lastSearchInActiveQuery = Object.assign(Object.assign({}, lastSearchQueries), { isActive: false });
            const lastTotalActive = await this.userRepository
                .model()
                .find(Object.assign({}, lastSearchActiveQuery))
                .count();
            const lastTotalInActive = await this.userRepository
                .model()
                .find(Object.assign({}, lastSearchInActiveQuery))
                .count();
            const lastTotalAll = await this.userRepository
                .model()
                .find(Object.assign({}, lastSearchQueries))
                .count();
            allPercentage = ((totalAll - lastTotalAll) / (lastTotalAll || 1)) * 100;
            inActivePercentage =
                ((totalInActive - lastTotalInActive) / (lastTotalInActive || 1)) * 100;
            activePercentage =
                ((totalActive - lastTotalActive) / (lastTotalActive || 1)) * 100;
        }
        return {
            data: {
                all: totalAll,
                active: totalActive,
                inactive: totalInActive,
                allPercentage,
                inActivePercentage,
                activePercentage,
                showPercent: !!checkLast,
            },
        };
    }
    async dashboardCount(query) {
        const searchAllQuery = Object.assign(Object.assign(Object.assign({}, (query.startDate &&
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
        const totalAll = await this.userRepository
            .model()
            .find(Object.assign({}, searchAllQuery))
            .count();
        return totalAll;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_factory_1.UserFactory,
        wallet_service_1.WalletService,
        subscription_service_1.SubscriptionService,
        subscription_setting_service_1.SubscriptionSettingService,
        mailer_1.MailerService,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map