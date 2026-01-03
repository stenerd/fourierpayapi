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
exports.CommissionSchema = exports.Commission = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Commission = class Commission {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Commission.prototype, "affiliateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Payment', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Commission.prototype, "paymentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PaymentLink', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Commission.prototype, "paymentLinkId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: [1, 2] }),
    __metadata("design:type", Number)
], Commission.prototype, "tier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Commission.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'PENDING', enum: ['PENDING', 'PAID'] }),
    __metadata("design:type", String)
], Commission.prototype, "status", void 0);
Commission = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Commission);
exports.Commission = Commission;
exports.CommissionSchema = mongoose_1.SchemaFactory.createForClass(Commission);
exports.CommissionSchema.index({ affiliateId: 1, createdAt: -1 });
exports.CommissionSchema.index({ paymentId: 1 });
exports.CommissionSchema.index({ paymentLinkId: 1, tier: 1 });
//# sourceMappingURL=payment-link-affiliate.model.js.map