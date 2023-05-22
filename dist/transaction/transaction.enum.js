"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionType = exports.TransactionEntity = void 0;
var TransactionEntity;
(function (TransactionEntity) {
    TransactionEntity["PAYMENT"] = "Payment";
    TransactionEntity["WITHDRAWAL"] = "Withdrawal";
    TransactionEntity["WALLET"] = "Wallet";
})(TransactionEntity = exports.TransactionEntity || (exports.TransactionEntity = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["PAID"] = "paid";
    TransactionStatus["DECLINED"] = "declined";
    TransactionStatus["ABANDONED"] = "abandoned";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
//# sourceMappingURL=transaction.enum.js.map