"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeEnum = exports.PaymentLinkStateEnum = exports.PaymentLinkStatusEnum = void 0;
var PaymentLinkStatusEnum;
(function (PaymentLinkStatusEnum) {
    PaymentLinkStatusEnum["ACTIVE"] = "active";
    PaymentLinkStatusEnum["INACTIVE"] = "inactive";
    PaymentLinkStatusEnum["EXPIRED"] = "expired";
    PaymentLinkStatusEnum["PAUSED"] = "paused";
    PaymentLinkStatusEnum["TERMINATED"] = "terminated";
})(PaymentLinkStatusEnum = exports.PaymentLinkStatusEnum || (exports.PaymentLinkStatusEnum = {}));
var PaymentLinkStateEnum;
(function (PaymentLinkStateEnum) {
    PaymentLinkStateEnum["PRIVATE"] = "private";
    PaymentLinkStateEnum["PUBLIC"] = "public";
})(PaymentLinkStateEnum = exports.PaymentLinkStateEnum || (exports.PaymentLinkStateEnum = {}));
var FieldTypeEnum;
(function (FieldTypeEnum) {
    FieldTypeEnum["TEXT"] = "text";
    FieldTypeEnum["NUMBER"] = "number";
    FieldTypeEnum["SELECT"] = "select";
})(FieldTypeEnum = exports.FieldTypeEnum || (exports.FieldTypeEnum = {}));
//# sourceMappingURL=payment-link.enum.js.map