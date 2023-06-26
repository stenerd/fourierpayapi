"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinkFactory = void 0;
const common_1 = require("@nestjs/common");
const payment_link_model_1 = require("./models/payment-link.model");
const mongoose_1 = require("mongoose");
const payer_sheet_model_1 = require("./models/payer-sheet.model");
let PaymentLinkFactory = class PaymentLinkFactory {
    createNew(data, code, user_id, link_id, base_url) {
        const payment_link = new payment_link_model_1.PaymentLink();
        for (const [key, value] of Object.entries(data)) {
            payment_link[key] = value;
        }
        payment_link.code = code;
        const charges = +data.amount >= 2000 ? +data.amount * 0.02 + 100 : +data.amount * 0.02;
        payment_link.charges = charges > 3000 ? 3000 : charges;
        payment_link.link = `${base_url}/pay/${code}`;
        payment_link.creator_id = new mongoose_1.Types.ObjectId(user_id);
        payment_link.link_id = new mongoose_1.Types.ObjectId(link_id);
        return payment_link;
    }
    createPayerSheet(user_id, payment_link_id, payload) {
        const result = [];
        for (let i = 0; i < payload.length; i++) {
            const data = payload[i];
            if (data['Unique Field']) {
                const sheet = new payer_sheet_model_1.PayerSheet();
                sheet.creator_id = new mongoose_1.Types.ObjectId(user_id);
                sheet.payment_link_id = new mongoose_1.Types.ObjectId(payment_link_id);
                sheet.unique_answer = data['Unique Field'].trim();
                sheet.priority_1_answer = data['First Priority'];
                sheet.priority_2_answer = data['Second Priority'];
                sheet.priority_3_answer = data['Third Priority'];
                result.push(sheet);
            }
        }
        return result;
    }
};
PaymentLinkFactory = __decorate([
    (0, common_1.Injectable)()
], PaymentLinkFactory);
exports.PaymentLinkFactory = PaymentLinkFactory;
//# sourceMappingURL=payment-link.factory.js.map