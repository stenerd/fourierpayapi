"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(message, statusCode) {
        super(message, common_1.HttpStatus.NOT_FOUND);
        this.setStatusCode(statusCode);
    }
    getStatusCode() {
        return this.statusCode;
    }
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base.exception.js.map