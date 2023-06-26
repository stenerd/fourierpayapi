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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const payment_link_enum_1 = require("../payment-link/payment-link.enum");
const payment_link_service_1 = require("../payment-link/payment-link.service");
let JobService = class JobService {
    constructor(paymentLinkService) {
        this.paymentLinkService = paymentLinkService;
    }
    async paymentLinkStatusJob() {
        const today = new Date();
        console.log('entered!!');
        await this.paymentLinkService
            .getRepository()
            .model()
            .updateMany({
            expires_at: { $lt: today },
            status: {
                $in: [
                    payment_link_enum_1.PaymentLinkStatusEnum.ACTIVE,
                    payment_link_enum_1.PaymentLinkStatusEnum.INACTIVE,
                    payment_link_enum_1.PaymentLinkStatusEnum.PAUSED,
                ],
            },
        }, { status: payment_link_enum_1.PaymentLinkStatusEnum.EXPIRED });
        console.log('completed');
        return true;
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "paymentLinkStatusJob", null);
JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_link_service_1.PaymentLinkService])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map