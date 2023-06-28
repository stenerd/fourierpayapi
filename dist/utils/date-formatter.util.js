"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckDateDifference = void 0;
const CheckDateDifference = function (start_date, end_date) {
    const date1 = new Date(start_date);
    const date2 = new Date(end_date);
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
exports.CheckDateDifference = CheckDateDifference;
//# sourceMappingURL=date-formatter.util.js.map