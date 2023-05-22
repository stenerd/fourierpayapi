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
exports.PaystackService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const external_call_service_1 = require("../external-call/external-call.service");
let PaystackService = class PaystackService {
    constructor(configService, call) {
        this.configService = configService;
        this.call = call;
    }
    async initializePaystack(data) {
        const payload = {
            key: this.configService.get('PAYSTACK_PUBLIC'),
            payer_id: data.payer_id,
            reciever_id: data.reciever_id,
            entity: data.entity,
            entity_id: data.entity_id,
            amount: data.amount,
            email: data.email,
            reference: data.reference,
            currency: 'NGN',
            metadata: {
                payer_id: data.payer_id,
                reciever_id: data.reciever_id,
                entity: data.entity,
                entity_id: data.entity_id,
                amount: data.amount,
                email: data.email,
                others: data.metadata,
            },
            channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        };
        const { result, err } = await this.call.postData(this.configService.get('INITIALIZE_PAYMENT_ENDPOINT'), payload, {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        console.log('djfls >> ', {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        if (err)
            throw new common_1.BadRequestException(err.data ? err.data.message : err);
        return result;
    }
    async verifyPayment(reference) {
        const { result, err } = await this.call.fetchData(`${this.configService.get('VERIFY_PAYMENT_ENDPOINT')}/${encodeURIComponent(reference)}`, {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        if (err)
            throw new common_1.BadRequestException(err.data ? err.data.message : err);
        console.log('result >> ', result);
        console.log('result.data >> ', result.data);
        const payment_data = result.data;
        if (payment_data.status != 'success' && payment_data.status != 'abandoned')
            throw new common_1.BadRequestException('Unable to verify paystack payment request');
        console.log('payment_data >> ', payment_data);
        return result.data;
    }
    async fetchBankList() {
        const { result, err } = await this.call.fetchData(`${this.configService.get('BANK_LIST_ENDPOINT')}`, {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        if (err)
            throw new common_1.BadRequestException(err.data ? err.data.message : err);
        return result.data;
    }
    async resolveAccountNumber(dto) {
        const { result, err } = await this.call.fetchData(`${this.configService.get('RESOLVE_ACCOUNT_ENDPOINT')}?account_number=${encodeURIComponent(dto.account_number)}&bank_code=${encodeURIComponent(dto.bank_code)}`, {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        if (err)
            throw new common_1.BadRequestException(err.data ? err.data.message : err);
        return result.data;
    }
    async transferRecipient(data) {
        const { result, err } = await this.call.postData(this.configService.get('TRANSFER_RECIPIENT_ENDPOINT'), Object.assign(Object.assign({}, data), { metadata: { user_id: data.user_id } }), {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        if (err)
            throw new common_1.BadRequestException(err.data ? err.data.message : err);
        console.log('transferRecipient result >> ', result);
        return result.data;
    }
    async transfer(recipient, amount) {
        const { result, err } = await this.call.postData(this.configService.get('TRANSFER_ENDPOINT'), {
            source: 'balance',
            amount,
            recipient: recipient,
            reason: 'Transfer',
        }, {
            Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
        });
        if (err)
            throw new common_1.BadRequestException(err.data ? err.data.message : err);
        console.log('transfer >> ', result);
        return result.data;
    }
};
PaystackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        external_call_service_1.ExternalApiCalls])
], PaystackService);
exports.PaystackService = PaystackService;
//# sourceMappingURL=paystack.service.js.map