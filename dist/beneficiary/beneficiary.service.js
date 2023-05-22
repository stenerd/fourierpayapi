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
exports.BeneficiaryService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const paystack_service_1 = require("../paystack/paystack.service");
const beneficiary_repository_1 = require("./beneficiary.repository");
let BeneficiaryService = class BeneficiaryService extends service_core_1.CoreService {
    constructor(beneficiaryRepository, paystackService) {
        super(beneficiaryRepository);
        this.beneficiaryRepository = beneficiaryRepository;
        this.paystackService = paystackService;
    }
    async createBeneficiary(dto, user_id) {
        const resolve_acc_number = await this.paystackService.resolveAccountNumber({
            bank_code: dto.bank_code,
            account_number: dto.account_number,
        });
        await this.create({
            user_id,
            account_number: dto.account_number,
            bank_name: dto.bank_name,
            account_name: resolve_acc_number.account_name,
            bank_code: dto.bank_code,
        });
    }
    async fetchBeneficiary(user_id) {
        const resp = await this.beneficiaryRepository.find({ user_id });
        return resp;
    }
    async removeBeneficiary(user_id, id) {
        console.log('sjdzv >> ', user_id, id);
        const resp = await this.beneficiaryRepository.deleteMany({
            user_id,
            _id: id,
        });
        return resp;
    }
};
BeneficiaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [beneficiary_repository_1.BeneficiaryRepository,
        paystack_service_1.PaystackService])
], BeneficiaryService);
exports.BeneficiaryService = BeneficiaryService;
//# sourceMappingURL=beneficiary.service.js.map