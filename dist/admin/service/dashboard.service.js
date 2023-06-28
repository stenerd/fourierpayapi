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
exports.AdminDashboardService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const transaction_service_1 = require("../../transaction/transaction.service");
const payment_link_service_1 = require("../../payment-link/payment-link.service");
const withdrawal_service_1 = require("../../withdrawal/withdrawal.service");
let AdminDashboardService = class AdminDashboardService {
    constructor(userService, transactionService, paymentLinkService, withdrawalService) {
        this.userService = userService;
        this.transactionService = transactionService;
        this.paymentLinkService = paymentLinkService;
        this.withdrawalService = withdrawalService;
    }
    async dashboard(query) {
        const users = await this.userService.dashboardCount(query);
        const transaction = await this.transactionService.dashboardTransaction(query);
        const charge = await this.transactionService.dashboardCharge(query);
        const paymentLink = await this.paymentLinkService.dashboardPaymentLink(query);
        const withdrawal = await this.withdrawalService.dashboardWithdrawal(query);
        return { users, transaction, paymentLink, charge, withdrawal };
    }
};
AdminDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        transaction_service_1.TransactionService,
        payment_link_service_1.PaymentLinkService,
        withdrawal_service_1.WithdrawalService])
], AdminDashboardService);
exports.AdminDashboardService = AdminDashboardService;
//# sourceMappingURL=dashboard.service.js.map