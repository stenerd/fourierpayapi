"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentLinkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_payment_link_dto_1 = require("./create-payment-link.dto");
class UpdatePaymentLinkDto extends (0, swagger_1.PartialType)(create_payment_link_dto_1.CreatePaymentLinkDto) {
}
exports.UpdatePaymentLinkDto = UpdatePaymentLinkDto;
//# sourceMappingURL=update-payment-link.dto.js.map