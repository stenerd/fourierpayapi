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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
const controller_core_1 = require("../common/core/controller.core");
const auth_guards_1 = require("../common/guards/auth.guards");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let WalletController = class WalletController extends controller_core_1.CoreController {
    constructor(walletService) {
        super();
        this.walletService = walletService;
    }
    async createWallet(currentUser, res) {
        const wallet = await this.walletService.create({
            user_id: currentUser._id,
            amount: 0,
        });
        return this.responseSuccess(res, '00', 'Success', wallet, common_1.HttpStatus.CREATED);
    }
    async walletWithdraw(currentUser, dto, res) {
        const wallet = await this.walletService.walletWithdraw(dto, currentUser._id);
        return this.responseSuccess(res, '00', 'Success', wallet, common_1.HttpStatus.CREATED);
    }
    async getWallet(currentUser, res) {
        const resp = await this.walletService.getWallet(currentUser._id);
        return this.responseSuccess(res, '00', 'Success', resp, common_1.HttpStatus.OK);
    }
    async webhook(res, body) {
        console.log('body >> ', body);
        await this.walletService.webhook(body);
        const { event, data } = body;
        return this.responseSuccess(res, '00', 'Success', {}, common_1.HttpStatus.CREATED);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Post)('/withdraw'),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wallet_dto_1.walletWithdrawalDto, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "walletWithdraw", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Post)('/webhook'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "webhook", null);
WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map