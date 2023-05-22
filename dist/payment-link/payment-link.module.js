"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinkModule = void 0;
const common_1 = require("@nestjs/common");
const payment_link_service_1 = require("./payment-link.service");
const payment_link_controller_1 = require("./payment-link.controller");
const payment_link_model_1 = require("./models/payment-link.model");
const mongoose_1 = require("@nestjs/mongoose");
const payment_link_repository_1 = require("./repositories/payment-link.repository");
const payment_link_factory_1 = require("./payment-link.factory");
const user_module_1 = require("../user/user.module");
const link_module_1 = require("../link/link.module");
const excel_processor_service_1 = require("../file-processor/excel-processor.service");
const payer_sheet_model_1 = require("./models/payer-sheet.model");
const payer_sheet_repository_1 = require("./repositories/payer_sheet.repository");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let PaymentLinkModule = class PaymentLinkModule {
};
PaymentLinkModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            link_module_1.LinkModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'PaymentLink', schema: payment_link_model_1.PaymentLinkSchema },
                { name: 'PayerSheet', schema: payer_sheet_model_1.PayerSheetSchema },
            ]),
        ],
        controllers: [payment_link_controller_1.PaymentLinkController],
        providers: [
            payment_link_service_1.PaymentLinkService,
            payment_link_repository_1.PaymentLinkRepository,
            payer_sheet_repository_1.PayerSheetRepository,
            payment_link_factory_1.PaymentLinkFactory,
            excel_processor_service_1.ExcelService,
            cloudinary_service_1.CloudinaryService,
        ],
        exports: [
            payment_link_service_1.PaymentLinkService,
            payment_link_repository_1.PaymentLinkRepository,
            payment_link_factory_1.PaymentLinkFactory,
            payer_sheet_repository_1.PayerSheetRepository,
        ],
    })
], PaymentLinkModule);
exports.PaymentLinkModule = PaymentLinkModule;
//# sourceMappingURL=payment-link.module.js.map