"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackFactory = void 0;
const common_1 = require("@nestjs/common");
let PaystackFactory = class PaystackFactory {
    initilizePaymentPayload(data, reference, payment_link, payment, entity) {
        const user = payment_link.creator_id;
        const payload = {
            reciever_id: user._id.toString(),
            entity: entity,
            entity_id: payment._id,
            amount: (data.amount + payment_link.charges) * 100,
            email: user.email,
            reference,
            currency: 'NGN',
            metadata: {
                payer_id: null,
                reciever_id: user._id.toString(),
                entity,
                entity_id: payment._id,
                amount: data.amount,
                email: user.email,
                others: data.form,
            },
            channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        };
        return payload;
    }
};
PaystackFactory = __decorate([
    (0, common_1.Injectable)()
], PaystackFactory);
exports.PaystackFactory = PaystackFactory;
//# sourceMappingURL=paystack.factory.js.map